const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function() {
  it("Deployment should assign the total supply of tokens to the owner", async function() {
    const [owner] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("Token");

    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    expect(ownerBalance).to.equal(await hardhatToken.totalSupply());
  });

  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("Token"); // who is the deployer?

    const ownerNewBalance = await hardhatToken.totalSupply() - BigInt(50);

    await hardhatToken.transfer(addr1.address, 50); // how do we bind the owner as the msg.sender? It is by default bound to first Signer?
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(ownerNewBalance);

    // transfer from addr1 to addr2
    const addr1NewBalance = await hardhatToken.balanceOf(addr1.address) - BigInt(25);
    const addr2NewBalance = await hardhatToken.balanceOf(addr2.address) + BigInt(25);

    await hardhatToken.connect(addr1).transfer(addr2.address, 25);

    expect(await hardhatToken.balanceOf(owner.address)).to.equal(ownerNewBalance);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(addr1NewBalance);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(addr2NewBalance);
  });
})
