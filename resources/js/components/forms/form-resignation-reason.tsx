import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { IResignationReasonFormDialogProps } from "@/interfaces/IResignationReason";
import { resignationReasonFormSchema } from "@/schemas/form-resignation-reason-schema";

export const ResignationReasonFormDialog: React.FC<IResignationReasonFormDialogProps> = ({
    data,
    external_id,
    isOpen,
    setIsOpen,
    onSubmit
}) => {
    const isEditing = !!external_id;

    const form = useForm<z.infer<typeof resignationReasonFormSchema>>({
        resolver: zodResolver(resignationReasonFormSchema),
        defaultValues: {
            name: data?.name || "",
        },
    });

    const handleSubmit = (values: z.infer<typeof resignationReasonFormSchema>) => {
        onSubmit(values, external_id);
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
                        {isEditing ? "Editar motivo de demissão" : "Adicionar motivo de demissão"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Altere o nome do motivo de demissão."
                            : "Adicione um novo motivo de demissão ao sistema."}
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
                                placeholder="Digite o nome do motivo de demissão"
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
