import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IPermissionFormDialogProps } from "@/interfaces/IPermission";
import { permissionFormSchema } from "@/schemas/form-permissions-schema";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import Checkbox from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PermissionFormDialog: React.FC<IPermissionFormDialogProps> = ({
    data,
    id,
    isOpen,
    setIsOpen,
    onSubmit,
    tables,
}) => {
    const isEditing = !!id;

    const form = useForm<z.infer<typeof permissionFormSchema>>({
        resolver: zodResolver(permissionFormSchema),
        defaultValues: {
            name: data?.name || "",
            title: data?.title || "",
            is_for_table: false,
            table_name: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof permissionFormSchema>) => {
        onSubmit(values, id);
        setIsOpen(false);
        form.reset();
    };

    useEffect(() => {
        if (!isOpen) {
            form.reset();
        }
    }, [isOpen]);

    useEffect(() => {
        if (data) {
            form.reset({
                ...data,
            });
        }
    }, [data]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Editar Permissão" : "Adicionar Permissão"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Altere o nome da permissão."
                            : "Adicione uma nova permissão ao sistema."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-4 py-4">
                        {!form.watch("is_for_table") && (
                            <>
                                <div className="grid grid-cols-1 items-start gap-3">
                                    <Label
                                        htmlFor="name"
                                        className={
                                            !form.watch("is_for_table") &&
                                            (form.formState.errors as any).name
                                                ? "text-destructive"
                                                : undefined
                                        }
                                    >
                                        Nome
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Digite o nome da permissão"
                                        {...form.register("name")}
                                    />
                                </div>
                                {"name" in form.formState.errors && (
                                    <p className="text-destructive text-sm">
                                        {form.formState.errors.name?.message}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 items-start gap-3">
                                    <Label
                                        htmlFor="title"
                                        className={
                                            !form.watch("is_for_table") &&
                                            (form.formState.errors as any).title
                                                ? "text-destructive"
                                                : undefined
                                        }
                                    >
                                        Titulo
                                    </Label>
                                    <Input
                                        id="title"
                                        placeholder="Digite o Titulo da permissão"
                                        {...form.register("title")}
                                    />
                                </div>
                                {"title" in form.formState.errors && (
                                    <p className="text-destructive text-sm">
                                        {form.formState.errors.title?.message}
                                    </p>
                                )}
                            </>
                        )}
                        {form.watch("is_for_table") && (
                            <>
                                <div className="grid grid-cols-1 items-start gap-3">
                                    <Label
                                        htmlFor="table_name"
                                        className={
                                            (form.formState.errors as any)
                                                .table_name
                                                ? "text-destructive"
                                                : ""
                                        }
                                    >
                                        Tabela
                                    </Label>
                                    <Select
                                        onValueChange={(value) =>
                                            form.setValue("table_name", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a tabela..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Tabelas
                                                </SelectLabel>
                                                {tables?.map((table) => (
                                                    <SelectItem
                                                        key={table}
                                                        value={table}
                                                    >
                                                        {table}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {(form.formState.errors as any).table_name && (
                                    <p className="text-destructive text-sm">
                                        {
                                            (form.formState.errors as any)
                                                .table_name.message
                                        }
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                    {!isEditing && (
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isForTable"
                                    onChange={(e) => {
                                        form.setValue(
                                            "is_for_table",
                                            e.target.checked
                                        );
                                    }}
                                />
                                <label
                                    htmlFor="isForTable"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    As permissões são para alguma tabela?
                                </label>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
