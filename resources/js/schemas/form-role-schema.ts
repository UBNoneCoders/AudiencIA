import { z } from "zod";

const baseSchema = z.object({
    name: z
        .string()
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
});

const roleFormSchema = baseSchema;

export { roleFormSchema };
