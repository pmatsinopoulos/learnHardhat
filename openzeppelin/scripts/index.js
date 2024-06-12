const { JsonRpcApiProvider, JsonRpcProvider } = require("ethers");

const main = async () => {
  console.log("Starting...");

  const provider = new JsonRpcProvider("http://localhost:8545", undefined, {
    staticNetwork: true,
  });
  const accounts = await provider.listAccounts();
  // const accounts = await ethers.provider.listAccounts();

  console.log(accounts);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
