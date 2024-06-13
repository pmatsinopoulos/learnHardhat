const { ethers, upgrades } = require("hardhat");

const PROXY_CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const Box2 = await ethers.getContractFactory("Box2");

  console.log("Upgrading Box...");

  await upgrades.upgradeProxy(PROXY_CONTRACT_ADDRESS, Box2);

  console.log("Box upgraded");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
