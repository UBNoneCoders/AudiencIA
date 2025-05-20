import { Head, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { DataTable } from "@/components/data-table";
import { ClientFormDialog } from "@/components/forms/form-client";
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
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { HearingFormDialog } from "@/components/forms/form-hearing";
import { hearingFormSchema } from "@/schemas/form-hearing-schema";

const getColumns = (processes: {label: string, value: string}): ColumnDef<any>[] => [
    {
        accessorKey: "process_id",
        header: "Autor do Processo",
        cell: ({ row }) => (
            <div className="flex items-center gap-6">
                <span>{row.original.process.author_name}</span>
            </div>
        ),
    },
    {
        accessorKey: "process_number",
        header: "Autor do Processo",
        cell: ({ row }) => (
            <div className="flex items-center gap-6">
                <span>{row.original.process.process_number}</span>
            </div>
        ),
    },
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => (
            <div className="flex items-center gap-6">
                <span>{row.original.type}</span>
            </div>
        ),
    },
    {
        accessorKey: "date",
        header: "Data",
        cell: ({ row }) => (
            <div className="flex items-center gap-6">
                <span>
                    {new Date(row.original.date).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="flex items-center gap-6">
                <span>{row.original.status}</span>
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Ações</div>,
        cell: ({ row }) => {
            const process = row.original;

            const [isOpenAlertDelete, setIsOpenAlertDelete] = useState<boolean>(false);
            const onAlertDelete = () => setIsOpenAlertDelete(!isOpenAlertDelete);

            const [isOpenUpdateForm, setIsOpenUpdateForm] = useState<boolean>(false);
            const onUpdate = () => setIsOpenUpdateForm(!isOpenUpdateForm);

            const handleUpdate = (values: z.infer<ReturnType<typeof hearingFormSchema>>, id?: string) => {
                router.put(route('hearings.update', id), values, {
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

            const handleDelete = (id: string) => {
                router.delete(route('hearings.destroy', id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
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
                                        <DropdownMenuItem onClick={onUpdate}>
                                            Atualizar
                                        </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={onAlertDelete}>
                                            Deletar
                                        </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Alerta ao deletar */}
                            <AlertDialog open={isOpenAlertDelete}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta ação não pode ser desfeita. Isso excluirá permanentemente esse beneficio do sistema.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={onAlertDelete}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDelete(process.id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <HearingFormDialog
                                data={process}
                                id={process.id}
                                isOpen={isOpenUpdateForm}
                                setIsOpen={setIsOpenUpdateForm}
                                onSubmit={handleUpdate}
                                processes={processes}
                            />
                        </div>
                </>
            );
        },
    },
];

interface IProcess {
    id: string;
    client_id: string;
    author_name: string;
    opposing_party_name: string;
    process_number: string;
    case_reason: string;
    case_value: string;
    description?: string;
}

export default function Index({ hearings, processes, queryParams }: any) {
    const [processData, setEnterpriseData] = useState<IProcess[]>(hearings.data);
    const [columns, setColumns] = useState(getColumns(processes));
    const [currentPage, setCurrentPage] = useState(hearings.current_page);
    const [lastPage, setLastPage] = useState(hearings.last_page);
    const [perPage, setPerPage] = useState(hearings.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    console.log(hearings);

    useEffect(() => {
        setEnterpriseData(hearings.data);
        setColumns(getColumns(processes));
        setCurrentPage(hearings.current_page);
        setLastPage(hearings.last_page);
        setPerPage(hearings.per_page);
    }, [hearings]);

    useEffect(() => {
        if (processData.length === 0 && currentPage > 1) {
            fetchProcess(currentPage - 1, perPage, searchValue, sort);
        }
    }, [processData]);

    const fetchProcess = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('hearings.index', {
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
        if (page != hearings.current_page) {
            fetchProcess(page, perPage, searchValue, sort);
        }
    };

    const onSearchSubmit = () => {
        fetchProcess(1, perPage, searchValue, sort);
    }

    const onRowsPerPageChange = (rows: number) => {
        setPerPage(rows);
        setCurrentPage(1);
        if (rows != hearings.per_page) {
            fetchProcess(1, rows, searchValue, sort);
        }
    };

    const [isOpenAddBenefitForm, setIsOpenAddBenefitForm] = useState<boolean>(false);
    const onAddProcess = () => setIsOpenAddBenefitForm(!isOpenAddBenefitForm);

    const handleSubmit = (values: z.infer<ReturnType<typeof hearingFormSchema>>) => {
        router.post(route('hearings.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddProcess();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Audiências">
            <Head title="Lista de Audiências" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Audiências</h2>
                <DataTable
                    data={processData}
                    columns={columns}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    rowsPerPage={perPage}
                    searchValue={searchValue}
                    onSearchCharge={setSearchValue}
                    searchPlaceholder="Pesquisar pela parte autora ou n° do processo..."
                    onSearchSubmit={onSearchSubmit}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onAdd={onAddProcess}
                />
            </div>

            <HearingFormDialog
                handleSubmit={handleSubmit}
                isOpen={isOpenAddBenefitForm}
                setIsOpen={setIsOpenAddBenefitForm}
                onSubmit={handleSubmit}
                processes={processes}
            />
        </AuthenticatedLayout>
    );
}
