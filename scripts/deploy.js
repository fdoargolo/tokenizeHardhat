//const Web3 = require("web3");
//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

/*

const contractPath = path.resolve(
  __dirname,
  "../artifacts/contracts/Token.sol/Token.json"
);
const contractJSON = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const contractABI = contractJSON.abi;

const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const contract = new web3.eth.Contract(contractABI, contractAddress);

router.post("/create", async (req, res) => {
  const { value } = req.body;
  if (!value) {
    return res.status(400).json({ error: "Valor do token é necessário" });
  }

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .transfer(accounts[0], web3.utils.toWei(value, "ether"))
      .send({ from: accounts[0] });
    res.status(200).json({ message: "Token criado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar token" });
  }
});
*/

module.exports = router;
