import { expect } from "chai";
import { ethers } from "hardhat";
import { Tester } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Contract", function () {
  var Contract;
  var ctr: Tester;
  var accounts: SignerWithAddress[];

  this.beforeAll(async () => {
    Contract = await ethers.getContractFactory("Tester");
    ctr = await Contract.deploy("Contract", "CTR", 9, 100000000);
    await ctr.deployed();
    accounts = await ethers.getSigners();
    console.log("   Contract deployed by owner:", accounts[0].address);
  });

  describe("Queries:", () => {
    it("Token infors", async () => {
      const name = await ctr.name();
      const symbol = await ctr.symbol();
      const decimals = await ctr.decimals();
      const totalSupply = await ctr.totalSupply();
      console.log("       Name:", name);
      console.log("       Symbol:", symbol);
      console.log("       Decimals:", decimals);
      console.log("       Total Supply:", (totalSupply.div(10 ** decimals)).toString());
    });

    it("True owner", async () => {
      expect(await ctr.balanceOf(accounts[0].address)).to.equal(await ctr.totalSupply())
    });

    it("Transfer", async () => {
      const transferAmount = 100;

      await ctr.transfer(accounts[2].address, transferAmount);
      expect((await ctr.balanceOf(accounts[2].address)).toNumber()).to.equal(transferAmount);

      await ctr.connect(accounts[2]).transfer(accounts[0].address, transferAmount);
      expect((await ctr.balanceOf(accounts[2].address)).toNumber()).to.equal(0);

      await expect(ctr.connect(accounts[1]).transfer(accounts[2].address, 100)).to.be.reverted;
    });
  });
});
