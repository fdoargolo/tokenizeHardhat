# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

# Criação e gerenciamento de tokens

Tendo em vista que os recebíveis serão a partir compras com cartão de crédito, podemos assumir que a maioria dos valores de compra varia entre R$ 500 e R$ 5.000.
Assim, para definir o valor do token fizemos uma análise de mercado com o objetivo de democratizar o acesso a pequenos investidores como sendo de R$ 50,00. Esse valor é
viável considerando as taxas de transação na rede blockchain.
