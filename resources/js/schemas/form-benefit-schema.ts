import { z } from "zod";

const benefitFormSchema = (isEditing: boolean) =>
  z.object({
    name: isEditing
      ? z
          .string()
          .min(1, "O nome do benefício é obrigatório.")
          .max(255, "O nome do benefício deve ter no máximo 255 caracteres.")
          .optional()
      : z
          .string()
          .min(1, "O nome do benefício é obrigatório.")
          .max(255, "O nome do benefício deve ter no máximo 255 caracteres."),
    value: isEditing
      ? z
          .preprocess(
            (val) => (val === "" || val == null ? undefined : Number(val)),
            z
              .number({ invalid_type_error: "O valor deve ser numérico." })
              .optional()
          )
      : z.preprocess(
          (val) => Number(val),
          z.number({
            required_error: "O valor do benefício é obrigatório.",
            invalid_type_error: "O valor deve ser numérico.",
          })
        ),
    punishment_loss: isEditing
      ? z.boolean().optional()
      : z.boolean({
          required_error: "O campo “punição por perda” é obrigatório.",
          invalid_type_error: "O campo “punição por perda” deve ser um booleano.",
        }),
  });

export { benefitFormSchema };
