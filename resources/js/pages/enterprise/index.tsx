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
import { EnterpriseFormDialog } from "@/components/forms/form-enterprise";

import { IEnterprise, IEnterpriseProps } from "@/interfaces/IEnterprise";
import { enterpriseFormSchema } from "@/schemas/form-enterprise-schema";
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
            const enterprise = row.original;

            const [isOpenAlertDelete, setIsOpenAlertDelete] = useState<boolean>(false);
            const onAlertDelete = () => setIsOpenAlertDelete(!isOpenAlertDelete);

            const [isOpenUpdateForm, setIsOpenUpdateForm] = useState<boolean>(false);
            const onUpdate = () => setIsOpenUpdateForm(!isOpenUpdateForm);

            const handleUpdate = (values: z.infer<typeof enterpriseFormSchema>, external_id?: string) => {
                router.put(route('enterprises.update', external_id), values, {
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
                router.delete(route('enterprises.destroy', external_id), {
                    preserveState: true,
                    preserveScroll: true,
                });
            };

            return (
                <>
                    {useHasAnyPermission(['enterprises_list', 'enterprises_edit', 'enterprises_delete']) && (
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
                                    {useHasPermission("enterprises_list") && (
                                        <Link
                                            href="#"
                                            // href={route(
                                            //     "enterprises.show",
                                            //     enterprise.external_id
                                            // )}
                                        >
                                            <DropdownMenuItem>
                                                Visualizar
                                            </DropdownMenuItem>
                                        </Link>
                                    )}
                                    {useHasPermission("enterprises_edit") && (
                                        <DropdownMenuItem onClick={onUpdate}>
                                            Atualizar
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    {useHasPermission("enterprises_delete") && (
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
                                            Esta ação não pode ser desfeita. Isso excluirá permanentemente essa empresa do sistema.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={onAlertDelete}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDelete(enterprise.external_id); onAlertDelete() }} className="bg-red-500 hover:bg-red-900">
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <EnterpriseFormDialog
                                data={enterprise}
                                external_id={enterprise.external_id}
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

export default function Index({ enterprises, queryParams }: IEnterpriseProps) {
    const [enterpriseData, setEnterpriseData] = useState<IEnterprise[]>(enterprises.data);
    const [columns, setColumns] = useState(getColumns());
    const [currentPage, setCurrentPage] = useState(enterprises.current_page);
    const [lastPage, setLastPage] = useState(enterprises.last_page);
    const [perPage, setPerPage] = useState(enterprises.per_page);
    const [searchValue, setSearchValue] = useState(queryParams.search ?? "");
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "name", direction: "asc" });

    useEffect(() => {
        setEnterpriseData(enterprises.data);
        setColumns(getColumns());
        setCurrentPage(enterprises.current_page);
        setLastPage(enterprises.last_page);
        setPerPage(enterprises.per_page);
    }, [enterprises]);

    useEffect(() => {
        if (enterpriseData.length === 0 && currentPage > 1) {
            fetchEnterprise(currentPage - 1, perPage, searchValue, sort);
        }
    }, [enterpriseData]);

    const fetchEnterprise = (page = 1, perPage = 10, search = "", sort = { column: "name", direction: "asc" }) => {
        router.get(route('enterprises.index', {
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
        if (page != enterprises.current_page) {
            fetchEnterprise(page, perPage, searchValue, sort);
        }
    };

    const onSearchSubmit = () => {
        fetchEnterprise(1, perPage, searchValue, sort);
    }

    const onRowsPerPageChange = (rows: number) => {
        setPerPage(rows);
        setCurrentPage(1);
        if (rows != enterprises.per_page) {
            fetchEnterprise(1, rows, searchValue, sort);
        }
    };

    const [isOpenAddEnterpriseForm, setIsOpenAddEnterpriseForm] = useState<boolean>(false);
    const onAddEnterprise = () => setIsOpenAddEnterpriseForm(!isOpenAddEnterpriseForm);

    const handleSubmit = (values: z.infer<typeof enterpriseFormSchema>) => {
        router.post(route('enterprises.store'), values, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onAddEnterprise();
            },
        });
    };

    return (
        <AuthenticatedLayout header="Lista de Empresa">
            <Head title="Lista de Empresa" />
            <div className="flex flex-1 flex-col gap-4 h-full">
                <h2 className="text-lg font-semibold">Lista de Empresa</h2>
                <DataTable
                    data={enterpriseData}
                    columns={columns}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    rowsPerPage={perPage}
                    searchValue={searchValue}
                    onSearchCharge={setSearchValue}
                    searchPlaceholder="Pesquisar por nome da empresa..."
                    onSearchSubmit={onSearchSubmit}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onAdd={onAddEnterprise}
                    permissions={{
                        create: "enterprises_create",
                    }}
                />
            </div>

            {/* Formulário de Adicionar Permissão */}
            <EnterpriseFormDialog
                isOpen={isOpenAddEnterpriseForm}
                setIsOpen={setIsOpenAddEnterpriseForm}
                onSubmit={handleSubmit}
            />
        </AuthenticatedLayout>
    );
}
