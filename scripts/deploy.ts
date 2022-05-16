import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("Tester");
  const contract = await Contract.deploy("Contract", "CTR", 9, 100000000);

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
