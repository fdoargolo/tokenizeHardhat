async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CreditToken = await ethers.getContractFactory("CreditToken");
  const initialSupply = ethers.utils.parseUnits("1000", 18); // Fornecimento inicial de 1000 tokens
  const creditToken = await CreditToken.deploy(initialSupply);

  console.log("CreditToken deployed to:", creditToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
