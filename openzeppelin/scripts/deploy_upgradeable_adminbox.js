const { ethers, upgrades } = require("hardhat");

async function main() {
  const AdminBox = await ethers.getContractFactory("AdminBox");

  const adminBox = await upgrades.deployProxy(
    AdminBox,
    ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
    { initializer: "initialize" }
  );

  await adminBox.deployed();

  console.log("AdminBox contract deployed to", adminBox.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
