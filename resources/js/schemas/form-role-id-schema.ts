import { z } from "zod";

const baseSchema = z.object({
    permissions_id: z
        .array(z.string())
        .nonempty("Selecione pelo menos uma permissão."),
});

const roleIdFormSchema = baseSchema;

export { roleIdFormSchema };
