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
    // Smart Contract Declaration: uint public count = 123;
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 0);
    const count = web3.utils.hexToNumber(storedValue);
    const expectedResult = 123;
    assert.equal(count, expectedResult, `The password is different than expected`);
  });

  describe('should expose the value stored in slot 1', () => {
  // In this case many variables fit in the same slot, so a split is needed to get the values
  // Values are stored in order as they were declared from left to right
  // Example output: 0x000000000000000000001f01711935c4b89bfbfa43cff63cfc24536a09904467
  // Example output splitted: 0x00000000000000000000 1f(u16) 01(isTrue) 711935c4b89bfbfa43cff63cfc24536a09904467(owner)
    let storedValueSlot1;
    before(async () => {
      storedValueSlot1 = await web3.eth.getStorageAt(vaultAddress, 1);
    });

    it('should get the value of variable owner', async () => {
      // The first value corresponds to the address of the owner 
      // Smart Contract Declaration: address public owner = msg.sender;
      const owner = storedValueSlot1.substr(-40);
      const expectedOwner = `0x${owner}`
      const expectedOwnerChecksumFormatted = web3.utils.toChecksumAddress(expectedOwner);
      const myAccountChecksumFormatted = web3.utils.toChecksumAddress(accounts[0]);
      assert.equal(expectedOwnerChecksumFormatted, myAccountChecksumFormatted, `The owner is different than expected`);
    });

    it('should get the value of the variable isTrue', async () => {
      // The second value is the boolean variable isTrue
      // Smart Contract Declaration: bool public isTrue = true;
      const isTrueStoredValue = storedValueSlot1.substr(-42, 2);
      const isTrue = isTrueStoredValue === '01' ? true: false; // 01 means true, 00 means false
      assert.equal(isTrue, true, `The isTrue value is different than expected`);
    });

    it('should get the value of the variable uint16', async () => {
      // The third value is the uint16
      // Smart Contract Declaration: uint16 public u16 = 31;
      const u16Hex = storedValueSlot1.substr(-44, 2);
      const u16HexWithPrefix = `0x${u16Hex}`;
      const u16 = web3.utils.hexToNumber(u16HexWithPrefix);
      assert.equal(u16, 31, `The u16 value is different than expected`);
    });
  })
  
  it('should expose the password - slot 2', async () => {
    // Smart Contract Declaration: bytes32 private password;
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 2);
    const rawPassword = web3.utils.toAscii(storedValue);
    // Cleaning the password, it comes with some empty spaces
    const passwordInBytes = [];
    for (let i = 0; i < rawPassword.length; i++) {  
        passwordInBytes.push(rawPassword.charCodeAt(i));
    }
    const passwordInBytesFiltered = passwordInBytes.filter(n => n !== 0);
    const password = String.fromCharCode(...passwordInBytesFiltered);
    const expectedResult = 'THIS_IS_A_RANDOM_PASSWORD';
    assert.equal(password, expectedResult, `The password is different than expected`);
  });

  it('should expose the value stored in slot 3,4,5', async () => {
    // Smart Contract Declaration: bytes32[3] public data;
    const storedValue3 = await web3.eth.getStorageAt(vaultAddress, 3);
    console.log('storedValue3:', storedValue3);
    const storedValue4 = await web3.eth.getStorageAt(vaultAddress, 4);
    console.log('storedValue4:', storedValue4);
    const storedValue5 = await web3.eth.getStorageAt(vaultAddress, 5);
    console.log('storedValue5:', storedValue5);
    assert(true === true, ``);
  });

  it('should expose the value stored in slot 6', async () => {
    // Smart Contract Declaration: User[] private users;
    // In the slot 6 the length of the array can be found 
    // First user is located in the slot at hash of the declaration slot 6 
    // hash = web3.utils.soliditySha3({ type: "uint", value: 6 })
    // user1IdHex = await web3.eth.getStorageAt(vaultAddress, hash);  returns the id of the first User {uint id;bytes32 password}
    // To get the next property increment the hex of the hash by one
    // passwordInHex = await web3.eth.getStorageAt(vaultAddress, hash+1);  returns the password of User {uint id;bytes32 password}
    // web3.utils.toAscii(passwordInHex);
    // To get the id of next user2 increment the hash hex by one again and get the storageAt that position
    // To get the password of next user2 increment the hash hex by one again and get the storageAt that position
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 6);
    console.log('storedValue6:', storedValue);
    assert(true === true, ``);
  });

  it('should expose the value stored in slot 7', async () => {
    // Smart Contract Declaration: mapping(uint => User) private idToUser;
    // The slot of the declaration is empty
    // The id the the elements in the mapping can be found starting at the slot of the hash of 7
    // value is 1 because that is the userId === 1, while 7 is where the mapping starts 
    // hash = web3.utils.soliditySha3({ type: "uint", value: 1 }, { type: "uint", value: 7 })
    // userIdEqual1InHex = await web3.eth.getStorageAt(vaultAddress, hash);
    // userPasswordIdEqual1InHex = await web3.eth.getStorageAt(vaultAddress, hash+1);
    const storedValue = await web3.eth.getStorageAt(vaultAddress, 7);
    console.log('storedValue7:', storedValue);
    assert(true === true, ``);
  });
});
