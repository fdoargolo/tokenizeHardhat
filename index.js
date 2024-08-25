const express = require("express");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Configuração do provider e contrato
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey = "YOUR_PRIVATE_KEY"; // Substitua pelo endereço da sua conta do Hardhat
const wallet = new ethers.Wallet(privateKey, provider);

// Carregar o ABI e o endereço do contrato
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Substitua pelo endereço do contrato implantado
const abi = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "artifacts/contracts/CreditToken.sol/CreditToken.json"
    ),
    "utf8"
  )
).abi;
const contract = new ethers.Contract(contractAddress, abi, wallet);

app.post("/token/create", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).send("Amount is required");
  }

  try {
    const tx = await contract.mint(
      wallet.address,
      ethers.parseUnits(amount, 18)
    );
    await tx.wait();
    res.send("Token created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating token");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
