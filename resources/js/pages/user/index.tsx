// Substituí todas as variáveis relacionadas a Permission por User
import { useEffect, useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import { MoreHorizontal, Clipboard, ClipboardCheck } from "lucide-react";

import { DataTable } from "@/components/data-table";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
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

import { ColumnDef } from "@tanstack/react-table";
import { useHasAnyPermission, useHasPermission } from "@/utils/permissions";
import { IUser, IUserProps } from "@/interfaces/IUser";
import { UserFormDialog } from "@/components/forms/form-user";
import { Switch } from "@/components/ui/switch";
import { IRoleForCreateOptions } from "@/interfaces/ISelect";
import { userFormSchema } from "@/schemas/form-user-schema";
import { z } from "zod";

const getColumns = (rolesForCreateOptions: IRoleForCreateOptions[]): ColumnDef<any>[] => [
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
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span title={row.original.email} className="truncate max-w-[150px]">
                    {row.original.email.length > 20
                        ? `${row.original.email.slice(0, 20)}...`
                        : row.original.email}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "role",
        header: "Perfil",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span>{row.original.role_user}</span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <div className="flex justify-center">Ativo/Inativo</div>,
        cell: ({ row }) => {
            const active = row.original.active;

            const handleChange = () => {
                router.put(
                    route("users.active", row.original.external_id),
                    {
                        preserveState: true,
                        preserveScroll: true,
                    }
                );
            };

            return (
                <div className="flex justify-center items-center gap-2">
                    <Switch checked={active} onCheckedChange={handleChange} />
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;

            const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);
            const onAddUserForm = () => setIsUserFormOpen(!isUserFormOpen);

            const [isOpenAlertDelete, setIsOpenAlertDelete] =
                useState<boolean>(false);
            const onAlertDelete = () =>
                setIsOpenAlertDelete(!isOpenAlertDelete);

            const [isOpenAlertResetPassword, setIsOpenAlertResetPassword] =
                useState<boolean>(false);
            const onAlertResetPassword = () =>
                setIsOpenAlertResetPassword(!isOpenAlertResetPassword);

            const handleUpdate = (values: z.infer<ReturnType<typeof userFormSchema>>, external_id?: string) => {
                router.put(route('users.update', external_id), values, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        onAddUserForm();
                    },
                    onError: (errors) => {
                        console.error(errors);
                    },
                });
            };

            const handleDelete = (external_id: string) => {
                router.delete(route("users.destroy", external_id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            const handleResetPassword = (external_id: string) => {
                router.put(route("users.reset-password", external_id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
                    {useHasAnyPermission([
                        "users_list",
                        "users_edit",
                        "users_delete",
                    ]) && (
                            <div className="flex items-center justify-end gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <span className="sr-only">Opções</span>
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                        {useHasPermission("users_list") && (
                                            <Link
                                                href={route(
                                                    "users.show",
                                                    user.external_id
                                                )}
                                            >
                                                <DropdownMenuItem>
                                                    Visualizar
                                                </DropdownMenuItem>
                                            </Link>
                                        )}
                                        {useHasPermission("users_edit") && (
                                            <>
                                                <DropdownMenuItem
                                                    onClick={onAddUserForm}
                                                >
                                                    Atualizar
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={onAlertResetPassword}
                                                >
                                                    Resetar Senha
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuSeparator />
                                        {useHasPermission("users_delete") && (
                                            <DropdownMenuItem
                                                onClick={onAlertDelete}
                                            >
                                                Deletar
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Alerta ao deletar */}
                                <AlertDialog open={isOpenAlertDelete}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Você tem certeza absoluta?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta ação não pode ser desfeita.
                                                Isso excluirá permanentemente esse
                                                usuário do sistema.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                onClick={onAlertDelete}
                                            >
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => {
                                                    handleDelete(user.external_id);
                                                    onAlertDelete();
                                                }}
                                                className="bg-red-500 hover:bg-red-900"
                                            >
                                                Continuar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                {/* Alerta ao resetar senha */}
                                <AlertDialog open={isOpenAlertResetPassword}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Redefinir a senha de {user.name}
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Com essa ação, a senha do usuário
                                                será redefinida e aparecerá na sua
                                                tela.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                onClick={onAlertResetPassword}
                                            >
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => {
                                                    handleResetPassword(
                                                        user.external_id
                                                    );
                                                    onAlertResetPassword();
                                                }}
                                                className="bg-yellow-500 hover:bg-yellow-900"
                                            >
                                                Confirmar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <UserFormDialog
                                    data={user}
                                    external_id={user.external_id}
                                    isOpen={isUserFormOpen}
                                    setIsOpen={setIsUserFormOpen}
                                    rolesForCreateOptions={rolesForCreateOptions}
                                    onSubmit={handleUpdate}
                                />
                            </div>
                        )}
                </>
            );
        },
    },
];

export default function Index({ users, rolesForCreateOptions, queryParams, flash }: IUserProps) {
    const [userData, setUserData] = useState<IUser[]>(users.data);
    const [columns, setColumns] = useState(getColumns(rolesForCreateOptions));
    const [currentPage, setCurrentPage] = useState(users.current_page);
    const [lastPage, setLastPage] = useState(users.last_page);
    const [perPage, setPerPage] = useState(users.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{
        column: string;
        direction: "asc" | "desc";
    }>({ column: "name", direction: "asc" });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setUserData(users.data);
        setColumns(getColumns(rolesForCreateOptions));
        setCurrentPage(users.current_page);
        setLastPage(users.last_page);
        setPerPage(users.per_page);
    }, [users]);

    useEffect(() => {
        if (userData.length === 0 && currentPage > 1) {
            fetchUsers(currentPage - 1, perPage, searchValue, sort);
        }
    }, [userData]);

    const fetchUsers = (
        page = 1,
        perPage = 10,
        search = "",
        sort = { column: "name", direction: "asc" }
    ) => {
        router.get(
            route("users.index", {
                page,
                per_page: perPage,
                search,
                sort_column: sort.column,
                sort_direction: sort.direction,
            }),
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        if (page != users.current_page) {
            fetchUsers(page, perPage, searchValue, sort);
        }
    };

    const onSearchSubmit = () => {
        fetchUsers(1, perPage, searchValue, sort);
    };

    const onRowsPerPageChange = (rows: number) => {
        setPerPage(rows);
        setCurrentPage(1);
        if (rows != users.per_page) {
            fetchUsers(1, rows, searchValue, sort);
        }
    };

    const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);
    const onAddUserForm = () => setIsUserFormOpen(!isUserFormOpen);

    const [isOpenAlertNewPassword, setIsOpenAlertNewPassword] =
        useState<boolean>(false);
    const onAlertNewPassword = () =>
        setIsOpenAlertNewPassword(!isOpenAlertNewPassword);

    const copyToClipboard = () => {
        if (flash.newPassword) {
            navigator.clipboard.writeText(flash.newPassword);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    useEffect(() => {
        if (flash.newPassword) {
            onAlertNewPassword();
        }
    }, [flash.newPassword]);

    const handleSubmit = (values: z.infer<ReturnType<typeof userFormSchema>>) => {
        router.post(route('users.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddUserForm();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Usuários">
            <Head title="Lista de Usuários" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Usuários</h2>
                <DataTable
                    data={userData}
                    columns={columns}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    rowsPerPage={perPage}
                    searchValue={searchValue}
                    onSearchCharge={setSearchValue}
                    searchPlaceholder="Pesquisar por nome da usuário..."
                    onSearchSubmit={onSearchSubmit}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onAdd={onAddUserForm}
                    permissions={{
                        create: "users_create",
                    }}
                />
            </div>

            {/* Alerta ao resetar senha */}
            <AlertDialog open={isOpenAlertNewPassword}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Nova senha foi gerada!
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            A nova senha foi gerada com sucesso. Copie a senha e
                            compartilhe com o usuário.
                        </AlertDialogDescription>
                        <AlertDialogDescription className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                            <span className="font-mono text-lg">
                                {flash.newPassword}
                            </span>
                            <Button
                                onClick={copyToClipboard}
                                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                                {copied ? (
                                    <ClipboardCheck className="text-green-600" />
                                ) : (
                                    <Clipboard className="text-gray-700" />
                                )}
                            </Button>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={onAlertNewPassword}
                            className="bg-green-500 hover:bg-green-900"
                        >
                            Ok
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <UserFormDialog
                isOpen={isUserFormOpen}
                setIsOpen={setIsUserFormOpen}
                rolesForCreateOptions={rolesForCreateOptions}
                onSubmit={handleSubmit}
            />
        </AuthenticatedLayout>
    );
}
