const Vault = artifacts.require("./Vault.sol");
const Web3Utils = require('web3-utils');

module.exports = function(deployer) {
  const passwordInHex = Web3Utils.fromAscii('THIS_IS_A_RANDOM_PASSWORD');
  deployer.deploy(Vault, passwordInHex);
};
