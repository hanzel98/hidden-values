var Vault = artifacts.require("./Vault.sol");

contract('Vault', function(accounts) {
  
  it("should print the contract address", function async () {
    const address = await Vault.deployed()
    console.log('address', address)
    // .then(function(instance) {
    //   return instance.getBalance.call(accounts[0]);
    // }).then(function(balance) {
    //   assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    // });
  });

});
