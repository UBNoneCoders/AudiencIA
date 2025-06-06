import { z } from "zod";

const userFormSchema = (isEditing: boolean) =>
    z
        .object({
            name: isEditing
                ? z
                    .string()
                    .min(1, "O nome é obrigatório.")
                    .max(100, "O nome deve ter no máximo 100 caracteres.")
                    .optional()
                : z
                    .string()
                    .min(1, "O nome é obrigatório.")
                    .max(100, "O nome deve ter no máximo 100 caracteres."),
            email: isEditing
                ? z
                    .string()
                    .email("Digite um email válido.")
                    .optional()
                : z
                    .string()
                    .email("Digite um email válido.")
                    .min(1, "O email é obrigatório."),
            password: isEditing
                ? z.preprocess(
                    (val) => (val === "" ? null : val),
                    z.string()
                        .min(8, "A senha deve ter no mínimo 8 caracteres.")
                        .max(50, "A senha deve ter no máximo 50 caracteres.")
                        .nullable()
                        .optional()
                )
                : z.string()
                    .min(8, "A senha deve ter no mínimo 8 caracteres.")
                    .max(50, "A senha deve ter no máximo 50 caracteres."),
            password_confirmation: isEditing
                ? z.preprocess(
                    (val) => (val === "" ? null : val),
                    z.string()
                        .min(8, "A senha deve ter no mínimo 8 caracteres.")
                        .max(50, "A senha deve ter no máximo 50 caracteres.")
                        .nullable()
                        .optional()
                )
                : z.string()
                    .min(8, "A confirmação de senha deve ter no mínimo 8 caracteres.")
                    .max(50, "A confirmação de senha deve ter no máximo 50 caracteres."),
            role: isEditing
                ? z.string().min(1, "O papel é obrigatório.").optional()
                : z.string().min(1, "O papel é obrigatório."),
            active: isEditing
                ? z.boolean().optional()
                : z.boolean(),
        })
        .refine(
            (data) => isEditing || data.password === data.password_confirmation,
            {
                message: "As senhas devem ser iguais.",
                path: ["password_confirmation"],
            }
        );

export { userFormSchema };
