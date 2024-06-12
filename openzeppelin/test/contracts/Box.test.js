// Load dependencies

const { expect } = require("chai");

require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

// Start test block
describe("Box", function () {
  const value = 42n;
  let owner;
  let other;

  before(async function () {
    this.Box = await ethers.getContractFactory("Box");
    [owner, other] = await ethers.getSigners();
  });

  beforeEach(async function () {
    this.box = await this.Box.deploy();
    await this.box.deployed();
  });

  // Test case
  it("retrieve returns a value previously stored", async function () {
    // Store a value
    await this.box.store(42);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.box.retrieve()).toString()).to.equal("42");
  });

  it("store emits an event", async function () {
    await expect(this.box.store(value))
      .to.emit(this.box, "ValueChanged")
      .withArgs(value);
  });

  it("non owner cannot store a value", async function () {
    await expect(this.box.connect(other).store(value))
      .to.be.revertedWithCustomError(this.box, "OwnableUnauthorizedAccount")
      .withArgs(other.address);
  });
});
