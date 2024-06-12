const { JsonRpcApiProvider, JsonRpcProvider } = require("ethers");

const main = async () => {
  console.log("Starting...");

  const provider = new JsonRpcProvider("http://localhost:8545", undefined, {
    staticNetwork: true,
  });
  const accounts = await provider.listAccounts();
  // const accounts = await ethers.provider.listAccounts();

  console.log(accounts);

  // Getting a contract instance

  const address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const Box = await ethers.getContractFactory("Box");
  const box = await Box.attach(address);

  // Calling the contract

  let value = await box.retrieve();
  console.log("value = ", value);

  // Sending a transaction

  // In a real-world application, I may want to estimate the gas of my
  // transaction, and check a gas price oracle to know the optimal values
  // to use on every transaction.
  await box.store(23);

  value = await box.retrieve();
  console.log(value);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
