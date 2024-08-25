const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { ethers } = require("hardhat");
const app = express();
const port = 3000;

// Configurações do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Contract API",
      version: "1.0.0",
      description: "API para interagir com contratos inteligentes",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./index.js"], // Caminho para os comentários Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota para interagir com o contrato inteligente
/**
 * @swagger
 * /contract/set-number:
 *   post:
 *     summary: Define um número no contrato inteligente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro
 */
app.use(express.json());

app.post("/contract/set-number", async (req, res) => {
  try {
    const { number } = req.body;
    const [deployer] = await ethers.getSigners();
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();
    await myContract.deployed();

    const tx = await myContract.setNumber(number);
    await tx.wait();

    res.status(200).json({ message: "Número definido com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao definir o número" });
  }
});

/**
 * @swagger
 * /contract/get-number:
 *   get:
 *     summary: Obtém o número do contrato inteligente
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: integer
 *                   example: 42
 */
app.get("/contract/get-number", async (req, res) => {
  try {
    const [deployer] = await ethers.getSigners();
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();
    await myContract.deployed();

    const number = await myContract.getNumber();
    res.status(200).json({ number: number.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter o número" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(
    `Documentação Swagger disponível em http://localhost:${port}/api-docs`
  );
});
