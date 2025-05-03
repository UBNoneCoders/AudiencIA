import { useEffect, useState } from "react";
import { z } from "zod";
import { Head, router } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PermissionFormDialog } from "@/components/forms/form-permission";

import { IPermission, IPermissionProps } from "@/interfaces/IPermission";
import { permissionFormSchema } from "@/schemas/form-permissions-schema";
import { useHasAnyPermission, useHasPermission } from "@/utils/permissions";

const getColumnsPermissions = (): ColumnDef<any>[] => [
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span>{row.original.name}</span>
            </div>
        ),
    },
    {
        accessorKey: "title",
        header: "Titulo",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span>{row.original.title}</span>
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const permission = row.original;

            // Estado para controlar a abertura do alerta de deletar
            const [isOpenAlertDelete, setIsOpenAlertDelete] = useState<boolean>(false);
            const onAlertDelete = () => setIsOpenAlertDelete(!isOpenAlertDelete);

            // Estado para controlar a abertura do formulário de adicionar permissão
            const [isOpenUpdatePermissionForm, setIsOpenUpdatePermissionForm] = useState<boolean>(false);
            const onUpdatePermission = () => setIsOpenUpdatePermissionForm(!isOpenUpdatePermissionForm);

            const handleUpdate = (values: z.infer<typeof permissionFormSchema>, id?: number) => {
                router.put(route('permissions.update', id), values, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        onUpdatePermission();
                    },
                });
            };

            const handleDelete = (id: number) => {
                router.delete(route('permissions.destroy', id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
                    {useHasAnyPermission(['permissions_edit', 'permissions_delete']) && (
                        <div className="flex items-center justify-end gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Opções</span>
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    {useHasPermission("permissions_edit") && (
                                        <DropdownMenuItem onClick={onUpdatePermission}>
                                            Atualizar
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    {useHasPermission("permissions_delete") && (
                                        <DropdownMenuItem onClick={onAlertDelete}>
                                            Deletar
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Alerta ao deletar */}
                            <AlertDialog open={isOpenAlertDelete}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta ação não pode ser desfeita. Isso excluirá permanentemente essa permissão do sistema.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={onAlertDelete}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDelete(permission.id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {/* Formulário de Atualizar Permissão */}
                            <PermissionFormDialog
                                data={permission}
                                id={permission.id}
                                isOpen={isOpenUpdatePermissionForm}
                                setIsOpen={setIsOpenUpdatePermissionForm}
                                onSubmit={handleUpdate}
                            />
                        </div>
                    )}
                </>
            );
        },
    },
];

export default function Index({ permissions, queryParams, tables }: IPermissionProps) {
    const [permissionData, setPermissionsData] = useState<IPermission[]>(permissions.data);
    const [columnsPermissions, setColumnsPermissions] = useState(getColumnsPermissions());
    const [currentPage, setCurrentPage] = useState(permissions.current_page);
    const [lastPage, setLastPage] = useState(permissions.last_page);
    const [perPage, setPerPage] = useState(permissions.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    useEffect(() => {
        setPermissionsData(permissions.data);
        setColumnsPermissions(getColumnsPermissions());
        setCurrentPage(permissions.current_page);
        setLastPage(permissions.last_page);
        setPerPage(permissions.per_page);
    }, [permissions]);

    useEffect(() => {
        if (permissionData.length === 0 && currentPage > 1) {
            fetchPermissions(currentPage-1, perPage, searchValue, sort);
        }
    }, [permissionData]);

    // Função para realizar ṕassar os parametros
    const fetchPermissions = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('permissions.index', {
            page,
            per_page: perPage,
            search,
            sort_column: sort.column,
            sort_direction: sort.direction
        }), {
            preserveState: true,
            replace: true
        });
    };

    // Manipula mudança de página
    const onPageChange = (page: number) => {
        setCurrentPage(page);
        if (page != permissions.current_page) {
            fetchPermissions(page, perPage, searchValue, sort);
        }
    };

    const onSearchSubmit = () => {
        fetchPermissions(1, perPage, searchValue, sort);
    }

    // Manipula mudança de quantidade de linhas por página
    const onRowsPerPageChange = (rows: number) => {
        setPerPage(rows);
        setCurrentPage(1);
        if (rows != permissions.per_page) {
            fetchPermissions(1, rows, searchValue, sort);
        }
    };

    // Estado para controlar a abertura do formulário de adicionar permissão
    const [isOpenAddPermissionForm, setIsOpenAddPermissionForm] = useState<boolean>(false);
    const onAddPermission = () => setIsOpenAddPermissionForm(!isOpenAddPermissionForm);

    // Função ao submeter o formulário de adicionar permissão
    const handleSubmit = (values: z.infer<typeof permissionFormSchema>) => {
        router.post(route('permissions.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddPermission();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Permissões">
            <Head title="Lista de Permissões" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Permissões</h2>
                <DataTable
                    data={permissionData}
                    columns={columnsPermissions}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    rowsPerPage={perPage}
                    searchValue={searchValue}
                    onSearchCharge={setSearchValue}
                    searchPlaceholder="Pesquisar por nome da permissão..."
                    onSearchSubmit={onSearchSubmit}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onAdd={onAddPermission}
                    permissions={{
                        "create": "permissions_create",
                    }}
                />
            </div>

            {/* Formulário de Adicionar Permissão */}
            <PermissionFormDialog
                isOpen={isOpenAddPermissionForm}
                setIsOpen={setIsOpenAddPermissionForm}
                onSubmit={handleSubmit}
                tables={tables}
            />
        </AuthenticatedLayout>
    );
}
