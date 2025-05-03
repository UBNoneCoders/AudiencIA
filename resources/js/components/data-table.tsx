"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Plus,
    Search,
} from "lucide-react";
import { useState } from "react";
import { useHasPermission } from "@/utils/permissions";

export type DataTableProps<TData> = {
    columns: ColumnDef<TData>[];
    data: TData[];
    currentPage: number;
    lastPage: number;
    rowsPerPage?: number,
    searchValue?: string;
    searchPlaceholder?: string;
    pageSizeOptions?: number[];
    onSearchCharge?: (search: string) => void;
    onSearchSubmit?: () => void;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    onAdd?: () => void;
    permissions?: { [key: string]: string };
};

export function DataTable<TData>({
    columns,
    data,
    currentPage = 1,
    lastPage,
    pageSizeOptions = [10, 20, 30, 40, 50],
    rowsPerPage = pageSizeOptions[0],
    searchValue = "",
    searchPlaceholder = "Pesquisar...",
    onSearchCharge,
    onSearchSubmit,
    onPageChange,
    onRowsPerPageChange,
    onAdd,
    permissions,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        pageCount: lastPage, // Isto está correto para definir o total de páginas
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageSize: rowsPerPage,
                pageIndex: 0,
            }
        },
    });

    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);

    React.useEffect(() => {
        if (onPageChange) {
            onPageChange(localCurrentPage);
        }
    }, [localCurrentPage]);

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {onSearchCharge && (
                    <div className="flex flex-1 items-center gap-2">
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => onSearchCharge?.(e.target.value)}
                            className="max-w-sm"
                        />

                        <Button
                            variant="outline"
                            onClick={() => {
                                if (onSearchSubmit) {
                                    onSearchSubmit();
                                }
                            }}
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {/*
                            <Button variant="outline" className="ml-auto">
                                Colunas <ChevronDown />
                            </Button>
                        */}
                    </DropdownMenuTrigger>
                    {onAdd && useHasPermission(permissions?.['create'] ?? '') && (
                        <Button variant="outline" className="ml-auto" onClick={onAdd}>
                            <Plus /> <span className="hidden md:block">Adicionar</span>
                        </Button>
                    )}
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Sem resultados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between py-4">
                <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                    <div className="flex items-center space-x-2">
                        <Select
                            value={`${rowsPerPage}`}
                            onValueChange={(value) => {
                                if (onRowsPerPageChange) {
                                    onRowsPerPageChange(parseInt(value));
                                }
                            }}
                        >
                            <SelectTrigger className="h-8 w-[4.5rem]">
                                <SelectValue placeholder={`${rowsPerPage}`} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {pageSizeOptions.map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={`${pageSize}`}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center font-medium text-sm">
                        Página {currentPage} de{" "}
                        {lastPage}
                    </div>
                    <Button
                        aria-label="Go to first page"
                        variant="outline"
                        className="hidden size-8 p-0 lg:flex"
                        onClick={() => setLocalCurrentPage(1)}
                        disabled={localCurrentPage === 1}
                    >
                        <ChevronsLeft className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                            setLocalCurrentPage(localCurrentPage - 1)
                        }
                        disabled={localCurrentPage === 1}
                    >
                        <ChevronLeft className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to next page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                            setLocalCurrentPage(localCurrentPage + 1)
                        }
                        disabled={localCurrentPage === lastPage}
                    >
                        <ChevronRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to last page"
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => setLocalCurrentPage(lastPage)}
                        disabled={localCurrentPage === lastPage}
                    >
                        <ChevronsRight className="size-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
