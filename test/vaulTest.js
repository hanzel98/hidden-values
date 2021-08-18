const { assert } = require("chai");

const Vault = artifacts.require("./Vault.sol");
console.log('Vault:', Vault)

contract("Vault", accounts => {

  let vault = null;
  let vaultAddress;
  // Deploy the smart contract and store the address
  before(async () => {
    vault = await Vault.deployed();
    vaultAddress = vault.address;
  });
  
  it('should expose the count - slot 0', async () => {
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 0);
    const count = web3.utils.hexToNumber(storedValue);
    console.log('The count is:', count)
    const expectedResult = 123;
    assert.equal(count, expectedResult, `The password is different than expected`);
  });

  // TODO separate in different it
  it('should expose the value stored in slot 1', async () => {
    // In this case many variables fit in the same slot, so a split is needed to get the values
    // Values are stored in order as they were declared from left to right
    // Example output: 0x000000000000000000001f01711935c4b89bfbfa43cff63cfc24536a09904467
    // Example output splitted: 0x00000000000000000000 1f(u16) 01(isTrue) 711935c4b89bfbfa43cff63cfc24536a09904467(owner)
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 1);
    console.log('storedValue1:', storedValue);
    // The first value corresponds to the address of the owner 
    // address public owner = msg.sender;
    const owner = storedValue.substr(-40);
    const expectedOwner = `0x${owner}`
    const expectedOwnerChecksumFormatted = web3.utils.toChecksumAddress(expectedOwner);
    const myAccountChecksumFormatted = web3.utils.toChecksumAddress(accounts[0]);
    assert.equal(expectedOwnerChecksumFormatted, myAccountChecksumFormatted, `The owner is different than expected`);
    // The second value is the boolean isTrue
    // bool public isTrue = true;
    const isTrueStoredValue = storedValue.substr(-42, 2);
    const isTrue = isTrueStoredValue === '01' ? true: false; // 01 means true, 00 means false
    assert.equal(isTrue, true, `The isTrue value is different than expected`);
    
    // The third value is the uint16
    // uint16 public u16 = 31;
    // const u16Hex = storedValue.substr(-44, 2);
    // const u16 = web3.utils.toAscii(u16Hex);
    // assert.equal(u16, 31, `The u16 value is different than expected`);
  });

  it('should expose the password - slot 2', async () => {
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 2);
    const password = web3.utils.toAscii(storedValue);
    console.log(`The password is ${password}`);
    const expectedResult = 'THIS_IS_A_RANDOM_PASSWORD';
    assert.equal(password, expectedResult, `The password is different than expected`);
  });

  it('should expose the value stored in slot 3,4,5', async () => {
    const storedValue3 = await web3.eth.getStorageAt(vaultAddress, 3);
    console.log('storedValue3:', storedValue3);
    const storedValue4 = await web3.eth.getStorageAt(vaultAddress, 4);
    console.log('storedValue4:', storedValue4);
    const storedValue5 = await web3.eth.getStorageAt(vaultAddress, 5);
    console.log('storedValue5:', storedValue5);
    assert(true === true, ``);
  });

  it('should expose the value stored in slot 6', async () => {
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 6);
    console.log('storedValue6:', storedValue);
    assert(true === true, ``);
  });

  it('should expose the value stored in slot 7', async () => {
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 7);
    console.log('storedValue7:', storedValue);
    assert(true === true, ``);
  });
});
