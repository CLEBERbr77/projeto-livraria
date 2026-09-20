const { z } = require("zod");

const createBookSchema = z.object({
  title: z
    .string({ required_error: "O título é obrigatório." })
    .min(1, "O título não pode ser vazio."),
  author: z
    .string({ required_error: "O autor é obrigatório." })
    .min(1, "O autor não pode ser vazio."),
  price: z
    .number({ required_error: "O preço é obrigatório." })
    .positive("O preço deve ser maior que zero."),
  category: z
    .string({ required_error: "A categoria é obrigatória." })
    .min(1, "A categoria não pode ser vazia."),
  stock: z
    .number({ required_error: "O estoque é obrigatório." })
    .int("O estoque deve ser um número inteiro.")
    .nonnegative("O estoque não pode ser negativo.")
});

const updateBookSchema = createBookSchema.partial();

module.exports = {
  createBookSchema,
  updateBookSchema
};