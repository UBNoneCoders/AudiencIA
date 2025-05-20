import { z } from "zod"

export const hearingFormSchema = (isEditing: boolean) =>
  z.object({
    process_id: z
      .string({
        required_error: "O processo é obrigatório.",
        invalid_type_error: "Selecione um processo válido.",
      })
      .min(1, "Selecione um processo válido."),

    type: z
      .string({
        required_error: "O tipo de audiência é obrigatório.",
      })
      .min(3, "O tipo deve ter pelo menos 3 caracteres.")
      .max(100, "O tipo deve ter no máximo 100 caracteres."),

    date: z
      .string({
        required_error: "A data e hora da audiência são obrigatórias.",
      })
      .min(1, "Informe uma data e hora válida."),

    link: z
      .string()
      .url("O link deve ser uma URL válida.")
      .optional()
      .or(z.literal("")),

    status: z.enum(["Aberta", "Concluída", "Cancelada", "Adiada"], {
      required_error: "O status é obrigatório.",
      invalid_type_error: "Selecione um status válido.",
    }),

    description: z
      .string()
      .max(1000, "A descrição deve ter no máximo 1000 caracteres.")
      .optional()
      .or(z.literal("")),
  })
