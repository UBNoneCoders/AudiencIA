import { z } from "zod";

const loginFormSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    remember: z.boolean().optional(),
});

export default loginFormSchema;
