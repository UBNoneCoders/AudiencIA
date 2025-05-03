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
import { RoleIdFormDialog } from "@/components/forms/form-role-id";

import { useHasAnyPermission, useHasPermission } from "@/utils/permissions";
import { IRole, IRoleIdProps } from "@/interfaces/IRole";
import { IPermission } from "@/interfaces/IPermission";
import { roleIdFormSchema } from "@/schemas/form-role-id-schema";

const getColumns = (role: IRole): ColumnDef<any>[] => [
    {
        accessorKey: "title",
        header: "Nome",
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

            const handleDelete = (id: number, permission_id: number) => {
                console.log('Deletando Permissão do Perfil com id:', id);
                router.delete(route('roles.detachPermission', { id, permission_id }), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
                    {useHasAnyPermission(['roles_edit']) && (
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
                                    <DropdownMenuSeparator />
                                    {useHasPermission("roles_edit") && (
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
                                            Esta ação não pode ser desfeita. Isso excluirá permanentemente esse permissão desse perfil.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={onAlertDelete}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDelete(role.id, permission.id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </>
            );
        },
    },
];

export default function Index({ permissions, role, permissions_select, queryParams }: IRoleIdProps) {
    const [permissionData, setRoleData] = useState<IPermission[]>(permissions.data);
    const [columns, setColumns] = useState(getColumns(role));
    const [currentPage, setCurrentPage] = useState(permissions.current_page);
    const [lastPage, setLastPage] = useState(permissions.last_page);
    const [perPage, setPerPage] = useState(permissions.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    useEffect(() => {
        setRoleData(permissions.data);
        setColumns(getColumns(role));
        setCurrentPage(permissions.current_page);
        setLastPage(permissions.last_page);
        setPerPage(permissions.per_page);
    }, [permissions]);

    useEffect(() => {
        if (permissionData.length === 0 && currentPage > 1) {
            fetchPermissions(currentPage - 1, perPage, searchValue, sort);
        }
    }, [permissionData]);

    // Função para realizar ṕassar os parametros
    const fetchPermissions = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('roles.show', {
            id: role.id,
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

    // Estado para controlar a abertura do formulário de adicionar Perfil
    const [isOpenAddPermissionForm, setIsOpenAddPermissionForm] = useState<boolean>(false);
    const onAddPermission = () => setIsOpenAddPermissionForm(!isOpenAddPermissionForm);

    // Função ao submeter o formulário de adicionar Perfil
    const handleSubmit = (values: z.infer<typeof roleIdFormSchema>, role: IRole) => {
        console.log(values);
        router.post(route('roles.attachPermissions', role.id), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddPermission();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Permissões do Perfil">
            <Head title="Lista de Permissões do Perfil" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Permissões de {role.name}</h2>
                <DataTable
                    data={permissionData}
                    columns={columns}
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
                        "create": "roles_edit",
                    }}
                />
            </div>

            {/* Formulário de Adicionar Permissão */}
            <RoleIdFormDialog
                isOpen={isOpenAddPermissionForm}
                setIsOpen={setIsOpenAddPermissionForm}
                onSubmit={handleSubmit}
                role={role}
                permissions_select={permissions_select}
            />
        </AuthenticatedLayout>
    );
}
