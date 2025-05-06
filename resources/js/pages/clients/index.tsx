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

import { benefitFormSchema } from "@/schemas/form-benefit-schema";
import { clientFormSchema } from "@/schemas/form-client-schema";
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
        accessorKey: "gender",
        header: "Gênero",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <span>{row.original.gender.charAt(0).toUpperCase() + row.original.gender.substring(1)}</span>
            </div>
        ),
    },
    {
        accessorKey: "whatsapp",
        header: "Whatsapp",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <span>{row.original.whatsapp}</span>
            </div>
        ),
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const client = row.original;

            console.log(client);

            const [isOpenAlertDelete, setIsOpenAlertDelete] = useState<boolean>(false);
            const onAlertDelete = () => setIsOpenAlertDelete(!isOpenAlertDelete);

            const [isOpenUpdateForm, setIsOpenUpdateForm] = useState<boolean>(false);
            const onUpdate = () => setIsOpenUpdateForm(!isOpenUpdateForm);

            const handleUpdate = (values: z.infer<ReturnType<typeof clientFormSchema>>, id?: string) => {
                values.whatsapp = values.whatsapp.replace(/\D/g, "");

                router.put(route('clients.update', id), values, {
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
                router.delete(route('clients.destroy', id), {
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
                                        <AlertDialogAction onClick={() => { handleDelete(client.id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <ClientFormDialog
                                data={client}
                                id={client.id}
                                isOpen={isOpenUpdateForm}
                                setIsOpen={setIsOpenUpdateForm}
                                onSubmit={handleUpdate}
                            />
                        </div>
                </>
            );
        },
    },
];

interface IClient {
    id: string;
    name: string;
    gender: string;
    whatsapp: number;
}

export default function Index({ clients, queryParams }: any) {
    const [benefitData, setEnterpriseData] = useState<IClient[]>(clients.data);
    const [columns, setColumns] = useState(getColumns());
    const [currentPage, setCurrentPage] = useState(clients.current_page);
    const [lastPage, setLastPage] = useState(clients.last_page);
    const [perPage, setPerPage] = useState(clients.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    useEffect(() => {
        setEnterpriseData(clients.data);
        setColumns(getColumns());
        setCurrentPage(clients.current_page);
        setLastPage(clients.last_page);
        setPerPage(clients.per_page);
    }, [clients]);

    useEffect(() => {
        if (benefitData.length === 0 && currentPage > 1) {
            fetchBenefit(currentPage - 1, perPage, searchValue, sort);
        }
    }, [benefitData]);

    const fetchBenefit = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('clients.index', {
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
        if (page != clients.current_page) {
            fetchBenefit(page, perPage, searchValue, sort);
        }
    };

    const onSearchSubmit = () => {
        fetchBenefit(1, perPage, searchValue, sort);
    }

    const onRowsPerPageChange = (rows: number) => {
        setPerPage(rows);
        setCurrentPage(1);
        if (rows != clients.per_page) {
            fetchBenefit(1, rows, searchValue, sort);
        }
    };

    const [isOpenAddBenefitForm, setIsOpenAddBenefitForm] = useState<boolean>(false);
    const onAddBenefit = () => setIsOpenAddBenefitForm(!isOpenAddBenefitForm);

    const handleSubmit = (values: z.infer<ReturnType<typeof clientFormSchema>>) => {
        values.whatsapp = values.whatsapp.replace(/\D/g, "");

        router.post(route('clients.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddBenefit();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Clientes">
            <Head title="Lista de Clientes" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Clientes</h2>
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
                />
            </div>

            {/* Formulário de Adicionar Permissão */}
            <ClientFormDialog
                isOpen={isOpenAddBenefitForm}
                setIsOpen={setIsOpenAddBenefitForm}
                onSubmit={handleSubmit}
            />
        </AuthenticatedLayout>
    );
}
