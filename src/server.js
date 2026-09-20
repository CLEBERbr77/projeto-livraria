require("dotenv").config();
const express = require("express");
const bookRoutes = require("./routes/book.routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Importa as rotas com os caminhos completos (/books, /books/:id)
app.use(bookRoutes);

// Tratamento global de erros (Status 500)
app.use((err, req, res, next) => {
  console.error("Erro interno:", err);
  return res.status(500).json({ error: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});