const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const apiRoutes = require("./src/api");

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Caminho para o arquivo swagger.json
const swaggerFilePath = path.join(__dirname, "src", "swagger", "swagger.json");

// Ler e analisar o arquivo swagger.json
let swaggerDocument;
try {
  swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));
} catch (error) {
  console.error("Erro ao carregar swagger.json:", error);
  process.exit(1); // Sair do processo se houver um erro
}

// Configuração do Swagger UI para servir a documentação a partir do swagger.json
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Usar as rotas do API definidas no api.js
app.use("/api", apiRoutes);

// Definir a porta para o servidor
const PORT = 3000;

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(
    `Documentação Swagger disponível em http://localhost:${PORT}/api-docs`
  );
});
