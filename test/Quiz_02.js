const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

let Quiz_02;
let quiz_02;
let owner;
let addr1;
let addr2;

describe("Quiz_02", function () {
  this.beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners(); // 如何知道會有幾個 address?
    Quiz_02 = await ethers.getContractFactory("Quiz_02");
    quiz_02 = await Quiz_02.deploy();
  });
});