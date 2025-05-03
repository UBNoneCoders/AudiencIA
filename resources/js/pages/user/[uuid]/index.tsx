import { IUserShowProps } from "@/interfaces/IUser";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserFormDialog } from "@/components/forms/form-user";
import { useState } from "react";
import { userFormSchema } from "@/schemas/form-user-schema";
import { z } from "zod";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    getPaginationRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IAuditLog } from "@/interfaces/ILogs";
import { Button } from "@/components/ui/button";

export default function Index({
    user,
    rolesForCreateOptions,
    logs,
}: IUserShowProps) {
    console.log("Logs:", logs);
    const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);
    const onAddUserForm = () => setIsUserFormOpen(!isUserFormOpen);

    const handleUpdate = (
        values: z.infer<ReturnType<typeof userFormSchema>>,
        external_id?: string
    ) => {
        router.put(route("users.update", external_id), values, {
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

    const renderValues = (values: Record<string, any>) => {
        return Object.entries(values).map(([key, value]) => (
            <div key={key} className="text-sm">
                <strong>{key}:</strong> {String(value)}
            </div>
        ));
    };

    const columns: ColumnDef<IAuditLog>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "user_name",
            header: "Usuário",
        },
        {
            accessorKey: "auditable_type",
            header: "Tipo",
        },
        {
            accessorKey: "event",
            header: "Evento",
        },
        {
            header: "Valor Anterior",
            cell: ({ row }) => renderValues(row.original.old_values),
        },
        {
            header: "Valor Atualizado",
            cell: ({ row }) => renderValues(row.original.new_values),
        },
        {
            accessorKey: "ip_address",
            header: "IP",
        },
        {
            accessorKey: "created_at",
            header: "Data",
        },
    ];

    const table = useReactTable({
        data: logs,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <AuthenticatedLayout header="Detalhes do Usuário">
            <Head title="Detalhes do Usuário" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <Card>
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center">
                        <div>
                            <CardTitle>Informações do Usuário</CardTitle>
                            <CardDescription>
                                Dados essenciais do usuário, como nome, cargo e
                                outras informações relevantes.
                            </CardDescription>
                        </div>
                        <div className="flex flex-1 justify-start sm:justify-end">
                            <span
                                onClick={onAddUserForm}
                                className="text-primary cursor-pointer hover:text-primary/80 transition-colors duration-200"
                            >
                                Editar
                            </span>
                        </div>
                    </CardHeader>
                    <Separator className="mb-5" />
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Nome:</span>
                                <span>{user.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Email:</span>
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Cargo:</span>
                                <span>{user.role_user}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Status:</span>
                                <span>{user.active ? "Ativo" : "Inativo"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                    Criado em:
                                </span>
                                <span>
                                    {new Date(
                                        user.created_at
                                    ).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                    Última atualização:
                                </span>
                                <span>
                                    {new Date(
                                        user.updated_at
                                    ).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center">
                        <div>
                            <CardTitle>Registros de Auditoria</CardTitle>
                            <CardDescription>
                                Histórico de atividades e alterações realizadas
                                pelo usuário no sistema.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <Separator className="mb-5" />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredRowModel().rows.length}{" "}
                                registros encontrados.
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <UserFormDialog
                data={user}
                external_id={user.external_id}
                isOpen={isUserFormOpen}
                rolesForCreateOptions={rolesForCreateOptions}
                setIsOpen={setIsUserFormOpen}
                onSubmit={handleUpdate}
            />
        </AuthenticatedLayout>
    );
}
