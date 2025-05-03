import { z } from "zod";

const baseSchema = z.object({
    name: z
        .string()
        .min(1, { message: "O nome deve ter pelo menos 1 caracteres" }),
});

const resignationReasonFormSchema = baseSchema;

export { resignationReasonFormSchema };
