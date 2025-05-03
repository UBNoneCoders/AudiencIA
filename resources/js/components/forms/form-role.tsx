import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IRoleFormDialogProps } from "@/interfaces/IRole";
import { roleFormSchema } from "@/schemas/form-role-schema";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const RoleFormDialog: React.FC<IRoleFormDialogProps> = ({
    data,
    id,
    isOpen,
    setIsOpen,
    onSubmit,
}) => {
    const isEditing = !!id;

    const form = useForm<z.infer<typeof roleFormSchema>>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: {
            name: data?.name || "",
        },
    });

    const handleSubmit = (values: z.infer<typeof roleFormSchema>) => {
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
                        {isEditing ? "Editar Perfil" : "Adicionar Perfil"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Altere o nome da perfil."
                            : "Adicione uma nova perfil ao sistema."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="name"
                                className={
                                    (form.formState.errors as any).name
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Nome
                            </Label>
                            <Input
                                id="name"
                                placeholder="Digite o nome da perfil"
                                {...form.register("name")}
                            />
                        </div>
                        {"name" in form.formState.errors && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.name?.message}
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
