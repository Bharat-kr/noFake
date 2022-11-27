const { ethers } = require("hardhat");

const main = async () => {
  const NoFakeFactory = await ethers.getContractFactory("NoFake");
  const NoFakeContract = await NoFakeFactory.deploy();
  console.log("Contract deployed on address:", NoFakeContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Error in deploying contract >>", error);
    process.exit(1);
  });
