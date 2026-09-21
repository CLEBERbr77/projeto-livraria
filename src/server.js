require("dotenv").config();
const express = require("express");
const bookRoutes = require("./routes/book.routes.js");



const server = express();
const PORT = process.env.PORT || 4000;



// Configura o Express para ler JSON no corpo das requisições do Insomnia
server.use(express.json());

// Registra as rotas
server.use(bookRoutes);

// Tratamento global de erros (Status 500)
server.use((err, req, res, next) => {
  console.error("Erro interno:", err);
  return res.status(500).json({ error: "Erro interno do servidor." });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});