const Vault = artifacts.require("./Vault.sol");
const Web3Utils = require('web3-utils');

module.exports = function(deployer) {
  const passwordInHex = Web3Utils.fromAscii('MY_NAME_IS_HANZEL');
  console.log('passwordInHex', passwordInHex)
  deployer.deploy(Vault, passwordInHex);
};
