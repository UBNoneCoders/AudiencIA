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
import { IBenefitFormDialogProps } from "@/interfaces/IBenefit";
import { benefitFormSchema } from "@/schemas/form-benefit-schema";

export const BenefitFormDialog: React.FC<IBenefitFormDialogProps> = ({
    data,
    external_id,
    isOpen,
    setIsOpen,
    onSubmit
}) => {
    const isEditing = !!external_id;

    const form = useForm<z.infer<ReturnType<typeof benefitFormSchema>>>({
        resolver: zodResolver(benefitFormSchema(isEditing)),
        defaultValues: {
            name: data?.name || "",
            value: data?.value || 0,
            punishment_loss: data?.punishment_loss || false,
        },
    });

    const handleSubmit = (values: z.infer<ReturnType<typeof benefitFormSchema>>) => {
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
                punishment_loss: Boolean(data.punishment_loss),
            });
        }
    }, [data]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Editar Beneficio" : "Adicionar Beneficio"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Altere o nome da Beneficio."
                            : "Adicione um novo Beneficio ao sistema."}
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
                                placeholder="Digite o nome do Beneficio"
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
                                htmlFor="value"
                                className={
                                    (form.formState.errors as any).value
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Valor (R$)
                            </Label>
                            <Input
                                id="value"
                                type="number"
                                step="0.01"
                                min="0"
                                prefix="R$"
                                placeholder="Digite o valor do Beneficio"
                                {...form.register("value")}
                            />
                        </div>
                        {"value" in form.formState.errors && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.value?.message}
                            </p>
                        )}

                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="punishment_loss"
                                className={
                                    form.formState.errors.punishment_loss
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                O benefício é perdido em caso de penalidade?
                            </Label>
                            <Select
                                defaultValue={String(form.watch("punishment_loss"))}
                                onValueChange={(value) =>
                                    form.setValue(
                                        "punishment_loss",
                                        value === "true" ? true : false
                                    )
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione uma opção..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="true">
                                            SIM
                                        </SelectItem>
                                        <SelectItem value="false">
                                            NÃO
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {"punishment_loss" in form.formState.errors && (
                                <p className="text-destructive text-sm">
                                    {form.formState.errors.punishment_loss?.message}
                                </p>
                            )}
                        </div>
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
