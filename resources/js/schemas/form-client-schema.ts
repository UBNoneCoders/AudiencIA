import { z } from "zod"

export const clientFormSchema = (isEditing: boolean) =>
  z.object({
    name: z
      .string()
      .min(1, "O nome é obrigatório")
      .max(100, "O nome não pode ter mais que 100 caracteres"),

    gender: z.enum(["masculino", "feminino", "outro"], {
      required_error: "O gênero é obrigatório",
    }),

    whatsapp: z
      .string()
      .min(14, "O WhatsApp deve conter o formato completo (99) 99999-9999")
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido de WhatsApp"),
  })
