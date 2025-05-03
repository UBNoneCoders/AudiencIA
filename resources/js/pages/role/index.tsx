import { useEffect, useState } from "react";
import { z } from "zod";
import { Head, router, Link } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";

import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
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
import { RoleFormDialog } from "@/components/forms/form-role";

import { useHasAnyPermission, useHasPermission } from "@/utils/permissions";
import { IRole, IRoleProps } from "@/interfaces/IRole";
import { roleFormSchema } from "@/schemas/form-role-schema";

const getColumns = (): ColumnDef<any>[] => [
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const role = row.original;

            // Estado para controlar a abertura do alerta de deletar
            const [isOpenAlertDelete, setIsOpenAlertDelete] = useState<boolean>(false);
            const onAlertDelete = () => setIsOpenAlertDelete(!isOpenAlertDelete);

            // Estado para controlar a abertura do formulário de adicionar Perfil
            const [isOpenUpdatePermissionForm, setIsOpenUpdatePermissionForm] = useState<boolean>(false);
            const onUpdatePermission = () => setIsOpenUpdatePermissionForm(!isOpenUpdatePermissionForm);

            const handleUpdate = (values: z.infer<typeof roleFormSchema>, id?: number) => {
                router.put(route('roles.update', id), values, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        onUpdatePermission();
                    },
                });
            };

            const handleDelete = (id: number) => {
                router.delete(route('roles.destroy', id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
                    {useHasAnyPermission(['roles_list', 'roles_edit', 'roles_delete']) && (
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
                                    {useHasPermission("roles_list") && (
                                        <Link href={route('roles.show', role.id)}>
                                            <DropdownMenuItem>
                                                Visualizar
                                            </DropdownMenuItem>
                                        </Link>
                                    )}
                                    {useHasPermission("roles_edit") && (
                                        <DropdownMenuItem onClick={onUpdatePermission}>
                                            Atualizar
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    {useHasPermission("roles_delete") && (
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
                                            Esta ação não pode ser desfeita. Isso excluirá permanentemente esse perfil do sistema.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={onAlertDelete}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDelete(role.id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {/* Formulário de Atualizar Permissão */}
                            <RoleFormDialog
                            data={role}
                            id={role.id}
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


export default function Index({ roles, queryParams }: IRoleProps) {
    const [roleData, setRoleData] = useState<IRole[]>(roles.data);
    const [columns, setColumns] = useState(getColumns());
    const [currentPage, setCurrentPage] = useState(roles.current_page);
    const [lastPage, setLastPage] = useState(roles.last_page);
    const [perPage, setPerPage] = useState(roles.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    useEffect(() => {
        setRoleData(roles.data);
        setColumns(getColumns());
        setCurrentPage(roles.current_page);
        setLastPage(roles.last_page);
        setPerPage(roles.per_page);
    }, [roles]);

    useEffect(() => {
        if (roleData.length === 0 && currentPage > 1) {
            fetchPermissions(currentPage - 1, perPage, searchValue, sort);
        }
    }, [roleData]);

    // Função para realizar ṕassar os parametros
    const fetchPermissions = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('roles.index', {
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
        if (page != roles.current_page) {
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
        if (rows != roles.per_page) {
            fetchPermissions(1, rows, searchValue, sort);
        }
    };

    // Estado para controlar a abertura do formulário de adicionar Perfil
    const [isOpenAddPermissionForm, setIsOpenAddPermissionForm] = useState<boolean>(false);
    const onAddPermission = () => setIsOpenAddPermissionForm(!isOpenAddPermissionForm);

    // Função ao submeter o formulário de adicionar Perfil
    const handleSubmit = (values: z.infer<typeof roleFormSchema>) => {
        router.post(route('roles.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddPermission();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Perfis">
            <Head title="Lista de Perfis" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Perfis</h2>
                <DataTable
                    data={roleData}
                    columns={columns}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    rowsPerPage={perPage}
                    searchValue={searchValue}
                    onSearchCharge={setSearchValue}
                    searchPlaceholder="Pesquisar por nome da perfil..."
                    onSearchSubmit={onSearchSubmit}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onAdd={onAddPermission}
                    permissions={{
                        "create": "roles_create",
                    }}
                />
            </div>

            {/* Formulário de Adicionar Permissão */}
            <RoleFormDialog
            isOpen={isOpenAddPermissionForm}
            setIsOpen={setIsOpenAddPermissionForm}
            onSubmit={handleSubmit}
            />
        </AuthenticatedLayout>
    );
}
