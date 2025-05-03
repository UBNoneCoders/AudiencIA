import { z } from "zod";

const baseSchema = z.object({
    is_for_table: z.boolean().default(false),
});

const tableSchema = baseSchema
    .extend({
        table_name: z.string().min(3, {
            message: "O nome da tabela deve ter pelo menos 3 caracteres",
        }),
    })
    .refine((data) => data.is_for_table, {
        message:
            "O nome da tabela é obrigatório quando 'is_for_table' está ativado.",
        path: ["table_name"],
    });

const nameSchema = baseSchema
    .extend({
        name: z
            .string()
            .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
        title: z
            .string()
            .min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
    })
    .refine((data) => !data.is_for_table, {
        message: "O nome é obrigatório quando 'is_for_table' está desativado.",
        path: ["name"],
    });

const permissionFormSchema = z.union([nameSchema, tableSchema]);

export { permissionFormSchema };
