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
import { userFormSchema } from "@/schemas/form-user-schema";
import { IUserFormDialogProps } from "@/interfaces/IUser";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export const UserFormDialog: React.FC<IUserFormDialogProps> = ({
    data,
    external_id,
    isOpen,
    rolesForCreateOptions,
    setIsOpen,
    onSubmit,
}) => {
    const { auth } = usePage<PageProps>().props;
    const isEditing = !!external_id;

    const form = useForm<z.infer<ReturnType<typeof userFormSchema>>>({
        resolver: zodResolver(userFormSchema(isEditing)),
        defaultValues: {
            name: data?.name || "",
            email: data?.email || "",
            password: "",
            password_confirmation: "",
            role_id: data?.role_id || "",
            active: data?.active ?? true,
        },
    });

    const handleSubmit = (values: z.infer<ReturnType<typeof userFormSchema>>) => {
        onSubmit(values, external_id);
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
                role_id: String(data.role_id),
                active: Boolean(data.active),
            });
        }
    }, [data]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Editar Usuário" : "Adicionar Usuário"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Altere o usuário do sistema."
                            : "Adicione um novo usuário ao sistema."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="name"
                                className={
                                    form.formState.errors.name
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Nome
                            </Label>
                            <Input
                                id="name"
                                placeholder="Digite o nome"
                                {...form.register("name")}
                            />
                            {"name" in form.formState.errors && (
                                <p className="text-destructive text-sm">
                                    {form.formState.errors.name?.message}
                                </p>
                            )}
                        </div>

                        {!isEditing && (
                            <div className="grid grid-cols-1 items-start gap-3">
                                <Label
                                    htmlFor="email"
                                    className={
                                        form.formState.errors.email
                                            ? "text-destructive"
                                            : undefined
                                    }
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="Digite o email"
                                    {...form.register("email")}
                                />
                                {"email" in form.formState.errors && (
                                    <p className="text-destructive text-sm">
                                        {form.formState.errors.email?.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="password"
                                className={
                                    form.formState.errors.password
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Senha
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Digite a senha"
                                {...form.register("password")}
                            />
                            {"password" in form.formState.errors && (
                                <p className="text-destructive text-sm">
                                    {form.formState.errors.password?.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="password_confirmation"
                                className={
                                    form.formState.errors.password_confirmation
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Confirmar Senha
                            </Label>
                            <Input
                                type="password"
                                id="password_confirmation"
                                placeholder="Confirme a senha"
                                {...form.register("password_confirmation")}
                            />
                            {"password_confirmation" in form.formState.errors && (
                                <p className="text-destructive text-sm">
                                    {
                                        form.formState.errors.password_confirmation
                                            ?.message
                                    }
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="role_id"
                                className={
                                    form.formState.errors.role_id
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Perfil
                            </Label>
                            <Select
                                defaultValue={String(form.watch("role_id"))}
                                onValueChange={(value) => form.setValue("role_id", value)}
                                disabled={auth.user.external_id === external_id}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder="Selecione o perfil..."
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Perfil</SelectLabel>
                                        {rolesForCreateOptions?.map((role) => (
                                            <SelectItem value={String(role.value)} key={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {"role_id" in form.formState.errors && (
                                <p className="text-destructive text-sm">
                                    {form.formState.errors.role_id?.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 items-start gap-3">
                            <Label
                                htmlFor="active"
                                className={
                                    form.formState.errors.active
                                        ? "text-destructive"
                                        : undefined
                                }
                            >
                                Status
                            </Label>
                            <Select
                                defaultValue={String(form.watch("active"))}
                                onValueChange={(value) =>
                                    form.setValue(
                                        "active",
                                        value === "true" ? true : false
                                    )
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o status..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="true">
                                            Ativo
                                        </SelectItem>
                                        <SelectItem value="false">
                                            Inativo
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {"active" in form.formState.errors && (
                                <p className="text-destructive text-sm">
                                    {form.formState.errors.active?.message}
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
