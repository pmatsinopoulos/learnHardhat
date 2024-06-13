// Load dependencies

const { expect } = require("chai");

require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

// Start test block
describe("Box", function () {
  const value = 42n;
  let owner;
  let other;
  let Box;

  before(async function () {
    Box = await ethers.getContractFactory("Box");
    [owner, other] = await ethers.getSigners();
  });

  beforeEach(async function () {
    this.box = await Box.deploy();
    await this.box.deployed();
  });

  describe("#retrieve", async function () {
    context("when a value if previously stored", async function () {
      beforeEach(async function () {
        await this.box.store(value);
      });

      it("returns the value previously stored", async function () {
        // Note that we need to use strings to compare the 256 bit integers
        const retrievedValue = await this.box.retrieve();

        expect(retrievedValue.toString()).to.equal("42");
      });
    });
  });

  describe("#store", async function () {
    it("emits event ValueChanged with the value that has changed", async function () {
      await expect(this.box.store(value))
        .to.emit(this.box, "ValueChanged")
        .withArgs(value);
    });

    context("when a non-owner is trying to store a value", async function () {
      beforeEach(async function () {
        this.box = await this.box.connect(other);
      });

      it("reverts with custom error", async function () {
        await expect(this.box.store(value))
          .to.be.revertedWithCustomError(this.box, "OwnableUnauthorizedAccount")
          .withArgs(other.address);
      });
    });
  });
});
