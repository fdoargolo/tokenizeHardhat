const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

// Configuração do Web3
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // URL do nó local

// Carregar o ABI e o Bytecode do contrato
const contractPath = path.resolve(
  __dirname,
  "artifacts",
  "contracts",
  "CreditToken.sol",
  "Token.json"
);
const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const contractABI = contractJson.abi;
const contractBytecode = contractJson.bytecode;

async function main() {
  // Obter a lista de contas
  const accounts = await web3.eth.getAccounts();
  const deployer = accounts[0];
  console.log("Deploying contracts with the account:", deployer);

  // Criar uma instância do contrato
  const contract = new web3.eth.Contract(contractABI);

  // Implantar o contrato
  const deployTx = contract.deploy({
    data: contractBytecode,
    arguments: ["CreditToken", "MTK"], // Argumentos do construtor do contrato
  });

  // Estimar o gás necessário
  const gasEstimate = await deployTx.estimateGas();
  console.log("Estimated gas:", gasEstimate);

  // Enviar a transação de implantação
  const deployedContract = await deployTx.send({
    from: deployer,
    gas: gasEstimate,
  });

  console.log("Token deployed to:", deployedContract.options.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
