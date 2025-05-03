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
import { BenefitFormDialog } from "@/components/forms/form-benefit";

import { IBenefit, IBenefitProps } from "@/interfaces/IBenefit";
import { benefitFormSchema } from "@/schemas/form-benefit-schema";
import { useHasAnyPermission, useHasPermission } from "@/utils/permissions";

const getColumns = (): ColumnDef<any>[] => [
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => (
            <div className="flex items-center gap-6">
                <span>{row.original.name}</span>
            </div>
        ),
    },
    {
        accessorKey: "value",
        header: "Valor",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <span>R$ {row.original.value}</span>
            </div>
        ),
    },
    {
        accessorKey: "punishment_loss",
        header: "Falta faz perder o beneficio?",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span>{row.original.punishment_loss ? "SIM" : "NÂO"}</span>
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const benefit = row.original;

            const [isOpenAlertDelete, setIsOpenAlertDelete] = useState<boolean>(false);
            const onAlertDelete = () => setIsOpenAlertDelete(!isOpenAlertDelete);

            const [isOpenUpdateForm, setIsOpenUpdateForm] = useState<boolean>(false);
            const onUpdate = () => setIsOpenUpdateForm(!isOpenUpdateForm);

            const handleUpdate = (values: z.infer<ReturnType<typeof benefitFormSchema>>, external_id?: string) => {
                router.put(route('benefits.update', external_id), values, {
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
                router.delete(route('benefits.destroy', external_id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
                    {useHasAnyPermission(['benefits_edit', 'benefits_delete']) && (
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
                                    {useHasPermission("benefits_edit") && (
                                        <DropdownMenuItem onClick={onUpdate}>
                                            Atualizar
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    {useHasPermission("benefits_delete") && (
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
                                            Esta ação não pode ser desfeita. Isso excluirá permanentemente esse beneficio do sistema.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={onAlertDelete}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDelete(benefit.external_id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <BenefitFormDialog
                                data={benefit}
                                external_id={benefit.external_id}
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

export default function Index({ benefits, queryParams }: IBenefitProps) {
    const [benefitData, setEnterpriseData] = useState<IBenefit[]>(benefits.data);
    const [columns, setColumns] = useState(getColumns());
    const [currentPage, setCurrentPage] = useState(benefits.current_page);
    const [lastPage, setLastPage] = useState(benefits.last_page);
    const [perPage, setPerPage] = useState(benefits.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    useEffect(() => {
        setEnterpriseData(benefits.data);
        setColumns(getColumns());
        setCurrentPage(benefits.current_page);
        setLastPage(benefits.last_page);
        setPerPage(benefits.per_page);
    }, [benefits]);

    useEffect(() => {
        if (benefitData.length === 0 && currentPage > 1) {
            fetchBenefit(currentPage - 1, perPage, searchValue, sort);
        }
    }, [benefitData]);

    const fetchBenefit = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('benefits.index', {
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
        if (page != benefits.current_page) {
            fetchBenefit(page, perPage, searchValue, sort);
        }
    };

    const onSearchSubmit = () => {
        fetchBenefit(1, perPage, searchValue, sort);
    }

    const onRowsPerPageChange = (rows: number) => {
        setPerPage(rows);
        setCurrentPage(1);
        if (rows != benefits.per_page) {
            fetchBenefit(1, rows, searchValue, sort);
        }
    };

    const [isOpenAddBenefitForm, setIsOpenAddBenefitForm] = useState<boolean>(false);
    const onAddBenefit = () => setIsOpenAddBenefitForm(!isOpenAddBenefitForm);

    const handleSubmit = (values: z.infer<ReturnType<typeof benefitFormSchema>>) => {
        router.post(route('benefits.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddBenefit();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Benefios">
            <Head title="Lista de Benefios" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Benefios</h2>
                <DataTable
                    data={benefitData}
                    columns={columns}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    rowsPerPage={perPage}
                    searchValue={searchValue}
                    onSearchCharge={setSearchValue}
                    searchPlaceholder="Pesquisar por nome do beneficio..."
                    onSearchSubmit={onSearchSubmit}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onAdd={onAddBenefit}
                    permissions={{
                        create: "benefits_create",
                    }}
                />
            </div>

            {/* Formulário de Adicionar Permissão */}
            <BenefitFormDialog
                isOpen={isOpenAddBenefitForm}
                setIsOpen={setIsOpenAddBenefitForm}
                onSubmit={handleSubmit}
            />
        </AuthenticatedLayout>
    );
}
