import { useEffect, useState } from "react";
import { z } from "zod";
import { Head, Link, router } from "@inertiajs/react";
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
import { ResignationReasonFormDialog } from "@/components/forms/form-resignation-reason";

import { IResignationReason, IResignationReasonProps } from "@/interfaces/IResignationReason";
import { resignationReasonFormSchema } from "@/schemas/form-resignation-reason-schema";
import { useHasAnyPermission, useHasPermission } from "@/utils/permissions";

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
            const resignationReason = row.original;

            const [isOpenAlertDelete, setIsOpenAlertDelete] = useState<boolean>(false);
            const onAlertDelete = () => setIsOpenAlertDelete(!isOpenAlertDelete);

            const [isOpenUpdateForm, setIsOpenUpdateForm] = useState<boolean>(false);
            const onUpdate = () => setIsOpenUpdateForm(!isOpenUpdateForm);

            const handleUpdate = (values: z.infer<typeof resignationReasonFormSchema>, external_id?: string) => {
                router.put(route('resignation_reasons.update', external_id), values, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        onUpdate();
                    },
                    onError: (errors) => {
                        console.error(errors);
                    },
                });
            };

            const handleDelete = (external_id: string) => {
                router.delete(route('resignation_reasons.destroy', external_id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
                    {useHasAnyPermission(['resignation_reasons_edit', 'resignation_reasons_delete']) && (
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
                                    {useHasPermission("resignation_reasons_edit") && (
                                        <DropdownMenuItem onClick={onUpdate}>
                                            Atualizar
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    {useHasPermission("resignation_reasons_delete") && (
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
                                            Esta ação não pode ser desfeita. Isso excluirá permanentemente essa emotivos de demissão do sistema.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={onAlertDelete}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDelete(resignationReason.external_id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <ResignationReasonFormDialog
                                data={resignationReason}
                                external_id={resignationReason.external_id}
                                isOpen={isOpenUpdateForm}
                                setIsOpen={setIsOpenUpdateForm}
                                onSubmit={handleUpdate}
                            />
                        </div>
                    )}
                </>
            );
        },
    },
];

export default function Index({ resignationReasons, queryParams }: IResignationReasonProps) {
    const [resignationReasonData, setresignationReasonData] = useState<IResignationReason[]>(resignationReasons.data);
    const [columns, setColumns] = useState(getColumns());
    const [currentPage, setCurrentPage] = useState(resignationReasons.current_page);
    const [lastPage, setLastPage] = useState(resignationReasons.last_page);
    const [perPage, setPerPage] = useState(resignationReasons.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    useEffect(() => {
        setresignationReasonData(resignationReasons.data);
        setColumns(getColumns());
        setCurrentPage(resignationReasons.current_page);
        setLastPage(resignationReasons.last_page);
        setPerPage(resignationReasons.per_page);
    }, [resignationReasons]);

    useEffect(() => {
        if (resignationReasonData.length === 0 && currentPage > 1) {
            fetchResignationReason(currentPage - 1, perPage, searchValue, sort);
        }
    }, [resignationReasonData]);

    const fetchResignationReason = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('resignation_reasons.index', {
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

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        if (page != resignationReasons.current_page) {
            fetchResignationReason(page, perPage, searchValue, sort);
        }
    };

    const onSearchSubmit = () => {
        fetchResignationReason(1, perPage, searchValue, sort);
    }

    const onRowsPerPageChange = (rows: number) => {
        setPerPage(rows);
        setCurrentPage(1);
        if (rows != resignationReasons.per_page) {
            fetchResignationReason(1, rows, searchValue, sort);
        }
    };

    const [isOpenAddResignationReasonForm, setIsOpenAddResignationReasonForm] = useState<boolean>(false);
    const onAddResignationReason = () => setIsOpenAddResignationReasonForm(!isOpenAddResignationReasonForm);

    const handleSubmit = (values: z.infer<typeof resignationReasonFormSchema>) => {
        router.post(route('resignation_reasons.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddResignationReason();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Motivos de Demissão">
            <Head title="Lista de Motivos de Demissão" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Motivos de Demissão</h2>
                <DataTable
                    data={resignationReasonData}
                    columns={columns}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    rowsPerPage={perPage}
                    searchValue={searchValue}
                    onSearchCharge={setSearchValue}
                    searchPlaceholder="Pesquisar por nome da motivos de demissão..."
                    onSearchSubmit={onSearchSubmit}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onAdd={onAddResignationReason}
                    permissions={{
                        create: "resignation_reasons_create",
                    }}
                />
            </div>

            {/* Formulário de Adicionar Permissão */}
            <ResignationReasonFormDialog
                isOpen={isOpenAddResignationReasonForm}
                setIsOpen={setIsOpenAddResignationReasonForm}
                onSubmit={handleSubmit}
            />
        </AuthenticatedLayout>
    );
}
