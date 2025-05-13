import { z } from "zod"

export const processFormSchema = (isEditing: boolean) =>
  z.object({
    client_id: z.string().min(1, "Cliente é obrigatório."),
    author_name: z.string().min(3, "Nome do autor é obrigatório."),
    opposing_party_name: z
      .string()
      .min(3, "Nome da parte contrária é obrigatório."),
    process_number: z.string().min(5, "Número do processo é obrigatório."),
    case_reason: z.string().min(3, "Motivo do processo é obrigatório."),
    case_value: z.string().min(1, "Valor do processo é obrigatório."),
    description: z.string().optional(),
  })
