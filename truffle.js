// Allows us to use ES6 in our migrations and tests.
require('babel-register')
const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider");
const projectId = 'fe2aa055247941d292883d219dd934ce';
const mnemonic = fs.readFileSync("./secret").toString().trim();
const accountPK = '0xd2d8414aa1e3d75296800483a322ca02075e5332fd417c52494a8cb89bcf0eb0';
const accountAdd = '0x711935c4b89bFbFA43cff63cfc24536a09904467';
//truffle migrate --network rinkeby
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '15'
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${projectId}`);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
      from: accountAdd,
    }
  }
}
