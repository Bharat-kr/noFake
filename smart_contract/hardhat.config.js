require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "hwjYQ6KR53PF1eXVn6c_RlSm1su7QjfK";
const GOERLI_PRIVATE_KEY =
  "72243dee323acf5d072dfb423ce58266f66e12add974cb586aeef172469ac656";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};

// Contract deployed on address: 0x6f95090c39E443c8C308b6DD4444aA608F870710

