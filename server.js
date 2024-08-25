const express = require("express");
const Web3 = require("web3");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Configure Web3
const web3 = new Web3("http://localhost:8545"); // URL do nó local

// Carregar ABI e endereço do contrato
const contractPath = path.resolve(
  __dirname,
  "artifacts",
  "contracts",
  "ContractToken.sol",
  "Token.json"
);
const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const contractABI = contractJson.abi;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Endereço do contrato

const tokenContract = new web3.eth.Contract(contractABI, contractAddress);

app.use(bodyParser.json());

app.post("/token/create", async (req, res) => {
  const { to, amount } = req.body;

  if (!to || !amount) {
    return res.status(400).send('Missing "to" or "amount" in the request body');
  }

  try {
    const accounts = await web3.eth.getAccounts();
    const result = await tokenContract.methods
      .mint(to, web3.utils.toWei(amount, "ether"))
      .send({ from: accounts[0] });
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
