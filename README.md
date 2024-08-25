# Motor Inteligente para Gerenciamento de Tokens

## Introdução

O Motor Inteligente para Gerenciamento de Tokens é uma solução robusta e versátil projetada para instituições financeiras que desejam otimizar a tokenização de ativos. Construído como uma API REST, o motor oferece uma forma eficiente de gerar e gerenciar tokens com base em análises detalhadas dos parâmetros fornecidos. Ideal para tokenização de recebíveis de cartão de crédito e outros ativos, nossa ferramenta permite a integração direta com suas aplicações financeiras, simplificando a criação e o gerenciamento de tokens enquanto mantém a acessibilidade e a eficiência.

## Funcionalidades

- **API RESTful**: Integrável com aplicações financeiras existentes.
- **Gerenciamento de Tokens**: Defina o tipo de recebível e o valor do token com base em parâmetros específicos.
- **Endpoints**:
  - `/token/create`: Cria um novo token com o valor especificado.
  - `/token/transfer`: Realiza a transferência de tokens entre diferentes contas.
  - `/token/predict-value`: Calcula o valor apropriado para um token com base em dados de bureau.

## Detalhes Técnicos

### Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
/GitProjects/tokenizeHardhat/
|-- server.js        # Configuração do servidor e Swagger UI
|-- src/
|   |-- api.js        # Definição das rotas da API
|   |-- swagger/
|       |-- swagger.json  # Documentação Swagger da API
```

### Dependências

Certifique-se de ter as seguintes dependências instaladas:

- **express**: Framework web para Node.js.
- **swagger-ui-express**: Middleware para servir a documentação Swagger.
- **fs** e **path**: Módulos nativos do Node.js para manipulação de arquivos e caminhos.

### Configuração

1. **Instale as dependências**:

   ```bash
   npm install express swagger-ui-express
   ```

2. **Configuração do `server.js`**:

   ```javascript
   const express = require("express");
   const swaggerUi = require("swagger-ui-express");
   const fs = require("fs");
   const path = require("path");
   const apiRoutes = require("./src/api");

   const app = express();

   app.use(express.json());

   // Caminho para o arquivo swagger.json
   const swaggerFilePath = path.join(
     __dirname,
     "src",
     "swagger",
     "swagger.json"
   );

   // Ler e analisar o arquivo swagger.json
   let swaggerDocument;
   try {
     swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));
   } catch (error) {
     console.error("Erro ao carregar swagger.json:", error);
     process.exit(1);
   }

   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

   app.use("/api", apiRoutes);

   const PORT = 3000;

   app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`);
     console.log(
       `Documentação Swagger disponível em http://localhost:${PORT}/api-docs`
     );
   });
   ```

3. **Configuração do `api.js`**:

   ```javascript
   const express = require("express");
   const router = express.Router();

   // Endpoint para criar um token
   router.post("/token/create", (req, res) => {
     const { value } = req.body;
     if (!value) {
       return res.status(400).json({ error: "Valor do token é necessário" });
     }
     res.status(200).json({ message: "Token criado com sucesso", value });
   });

   // Endpoint para transferir tokens
   router.post("/token/transfer", (req, res) => {
     const { from, to, amount } = req.body;
     if (!from || !to || !amount) {
       return res
         .status(400)
         .json({ error: "Informações de transferência são necessárias" });
     }
     res.status(200).json({
       message: "Transferência realizada com sucesso",
       from,
       to,
       amount,
     });
   });

   // Endpoint para calcular o valor do token
   router.post("/token/predict-value", (req, res) => {
     const { bureauData } = req.body;
     if (!bureauData) {
       return res
         .status(400)
         .json({ error: "Dados do bureau são necessários para predição" });
     }

     const predictedValue = calculateTokenValue(bureauData);
     res.status(200).json({ predictedValue });
   });

   // Função mockada para cálculo do valor do token
   const calculateTokenValue = (bureauData) => {
     return 100; // Valor de exemplo
   };

   module.exports = router;
   ```

### Documentação Swagger

O arquivo `swagger.json` fornece a documentação da API e pode ser visualizado acessando o endpoint `/api-docs` após iniciar o servidor.

### Como Usar

1. **Inicie o servidor**:

   ```bash
   node server.js
   ```

2. **Acesse a documentação**:

   - Navegue até [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para visualizar a documentação Swagger da API.

3. **Use os Endpoints**:
   - `/api/token/create`: Cria um novo token.
   - `/api/token/transfer`: Transfere tokens entre contas.
   - `/api/token/predict-value`: Calcula o valor do token com base em dados de bureau.

## Contribuição

Se você deseja contribuir para o projeto, por favor, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações.
3. Faça commit das suas alterações.
4. Envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
