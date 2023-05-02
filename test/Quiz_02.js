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
});