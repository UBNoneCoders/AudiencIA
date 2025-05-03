import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { IRoleIdFormDialogProps } from "@/interfaces/IRole";
import { roleIdFormSchema } from "@/schemas/form-role-id-schema";

import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const RoleIdFormDialog: React.FC<IRoleIdFormDialogProps> = ({
    data,
    id,
    isOpen,
    setIsOpen,
    onSubmit,
    role,
    permissions_select,
}) => {
    const form = useForm<z.infer<typeof roleIdFormSchema>>({
        resolver: zodResolver(roleIdFormSchema),
        defaultValues: {
            permissions_id: [] as string[],
        },
    });

    const handleSubmit = (values: z.infer<typeof roleIdFormSchema>) => {
        onSubmit(values, role);
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
                permissions_id: data.permissions_id || [],
            });
        }
    }, [data]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Permissão do Perfil</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova permissão ao perfil.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="permissions_id"
                                className={
                                    form.formState.errors.permissions_id
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Adicionar Permissões
                            </Label>
                            <Controller
                                name="permissions_id"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <MultiSelect
                                            options={permissions_select}
                                            selected={field.value}
                                            onChange={field.onChange}
                                            placeholder="Selecione as permissões..."
                                            emptyText="Está vazio..."
                                        />
                                    </>
                                )}
                            />
                        </div>
                        {form.formState.errors.permissions_id && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.permissions_id?.message}
                            </p>
                        )}
                    </div>
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
