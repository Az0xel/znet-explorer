require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.19",
  networks: {
    znet: {
      url: process.env.L3_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
}; 