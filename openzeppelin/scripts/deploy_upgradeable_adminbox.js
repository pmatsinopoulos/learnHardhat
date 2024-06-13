const { ethers, upgrades } = require("hardhat");
const { vars } = require("hardhat/config");

const SEPOLIA_ACCOUNT = vars.get("SEPOLIA_ACCOUNT");

async function main() {
  const AdminBox = await ethers.getContractFactory("AdminBox");

  const adminBox = await upgrades.deployProxy(AdminBox, [SEPOLIA_ACCOUNT], {
    initializer: "initialize",
  });

  await adminBox.deployed();

  console.log("AdminBox contract deployed to", adminBox.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
