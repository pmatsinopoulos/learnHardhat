async function main() {
  const Box = await ethers.getContractFactory("Box");

  console.log("Deploying Box...");

  const box = await Box.deploy();

  await box.waitForDeployment();

  const address = await box.getAddress();

  console.log("Box Deployed to: ", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
