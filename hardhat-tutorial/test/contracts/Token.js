const { expect } = require("chai");
const { ethers } = require("hardhat");

const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("Token");

    await hardhatToken.waitForDeployment();

    return { hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the owner of the contract to the account deploying the contract", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      expect(await hardhatToken.owner()).to.equal(owner);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      const ownerBalance = await hardhatToken.balanceOf(owner.address);

      expect(ownerBalance).to.equal(await hardhatToken.totalSupply());
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      const ownerNewBalance = (await hardhatToken.totalSupply()) - BigInt(50);

      await expect(
        hardhatToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    });

    it("Should emit transfer events", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      await expect(hardhatToken.transfer(addr1.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(owner.address, addr1.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { hardhatToken, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // let addr1 have some tokens, but not too many
      await hardhatToken.transfer(addr1.address, 25);

      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 50)
      ).to.be.revertedWith(
        "There is no enough tokens in your balance to transfer this amount"
      );

      expect(await hardhatToken.balanceOf(addr1)).to.equal(25);
      expect(await hardhatToken.balanceOf(addr2)).to.equal(0);
    });
  });
});
