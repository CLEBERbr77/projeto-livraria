const { Router } = require("express");
const crypto = require("crypto");
const { readBooksFromFile, saveBooksToFile } = require("../repositories/book.repository.js");
const { createBookSchema, updateBookSchema } = require("../schemas/books.schema.js");
const router = Router();

// GET /books - Lista todos os livros (com filtro opcional por categoria)
router.get("/books", (req, res, next) => {
  try {
    const { category } = req.query;
    let books = readBooksFromFile();

    if (category) {
      books = books.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      );
    }

    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

// GET /books/:id - Busca um livro por ID
router.get("/books/:id", (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const book = books.find((b) => b.id === req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    return res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

// POST /books - Cadastra um novo livro
router.post("/books", (req, res, next) => {
  try {
    const validation = createBookSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "Dados de entrada inválidos.",
        details: validation.error.issues.map((issue) => issue.message)
      });
    }

    const books = readBooksFromFile();
    const newBook = {
      id: crypto.randomUUID(),
      ...validation.data
    };

    books.push(newBook);
    saveBooksToFile(books);

    return res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

// PUT /books/:id - Atualiza um livro existente
router.put("/books/:id", (req, res, next) => {
  try {
    const validation = updateBookSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "Dados de entrada inválidos.",
        details: validation.error.issues.map((issue) => issue.message)
      });
    }

    const books = readBooksFromFile();
    const index = books.findIndex((b) => b.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    books[index] = { ...books[index], ...validation.data };
    saveBooksToFile(books);

    return res.status(200).json(books[index]);
  } catch (error) {
    next(error);
  }
});

// DELETE /books/:id - Remove um livro
router.delete("/books/:id", (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const index = books.findIndex((b) => b.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    books.splice(index, 1);
    saveBooksToFile(books);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;