require("@nomiclabs/hardhat-ethers");

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");

// This is the private key of my SEPOLIA Account I use for testing.
// I save the value inside the ".envrc" which is not checked-in.
// +direnv+ makes sure that the environment variable is set accordingly.
//
const SEPOLIA_TEST_NET_PRIVATE_KEY = vars.get("SEPOLIA_TEST_NET_PRIVATE_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_TEST_NET_PRIVATE_KEY],
    },
  },
};
