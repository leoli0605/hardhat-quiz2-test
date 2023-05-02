const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

let MyToken;
let token;
let owner;
let addr1;
let addr2;

describe("Quiz_02", function () {
  this.beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners(); // 如何知道會有幾個 address?
    MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy();
  });

  it("should have correct name and symbol", async function () {
    expect(await token.name()).to.equal("MyToken");
    expect(await token.symbol()).to.equal("TTT");
  });

  it("should support interface", async function () {
    expect(await token.supportsInterface("0x00000001")).to.equal(false);
  });

  // reference: https://github.com/z-institute/Quiz/blob/main/test/Quiz_02.test.js
  it("should be able to mint to specified address", async function () {
    await token.mint(owner.address, 0, {
      value: ethers.utils.parseEther("0.1"),
    });
    expect(await token.ownerOf(0)).to.equal(owner.address);

    await token.batchMint(addr1.address, [1, 2], {
      value: ethers.utils.parseEther("0.2"),
    });
    expect(await token.ownerOf(1)).to.equal(addr1.address);
    expect(await token.ownerOf(2)).to.equal(addr2.address);
  });

  it("should revert when not enough funds", async function () {
    await expect(
      token.mint(owner.address, 0)
    ).to.be.revertedWith("Not enough funds to mint.");

    await expect(
      token.batchMint(addr1.address, [0, 1])
    ).to.be.revertedWith("Not enough funds to mint.");
  });
});