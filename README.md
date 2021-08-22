# hidden-values
## Description  
Project to read the value of private values in a solidity smart contract. It is a demonstration/reminder that private variables can be read from a public blockchain. There is a belief that only the smart contract can access private variables, but this is not true. It is possible to read the value of the variables declared in the smart contract since the EVM stores them according to the order of declaration and the type of variable. In this project there are some examples where private values are read using different tecnhiques. 

The slots in storage are stored as key-value pairs with a length of 256 bits (32 bytes) in the EVM. The default value of each slot is always 0, so we do not need to assign a value to 0 when the new declaration. According to the type of the variable it can use more than one slot. 

To access the value of these variables it is needed to have the address of the smart contract. Since the format of the values may change from type, this project also used web3 and the web3 utils.

## To consider
- Storage only stores variables, not constant.
- Each slot can store up to 256 bits (32 bytes).
- The variables in turn are in slot in the order of lower-order (ie from right to left).
- If the size of the variable exceeds the remaining size of the slot, this variable will be passed to the new slot.
- Struct creates a new slot, the struct elements are put into the slot in the same way as above.
- Dynamic size array creates a new slot, this slot only stores the length of the array, while the values in the array will be stored at other locations.
- String creates a new slot, this slot stores both data & data length.
- Bool type, only need 1 bit to store, but in solidity, the smallest data type is 8 bits, so bool will also occupy 8 bits.

### Instructions 
1) Clone the repository.
2) Run `npm install` inside the project root.
3) Amnemonic is needed to run this project. Paste the mnemonic in the secret file, without quotes.
4) Run `truffle compile` to compile the smart contracts.
5) Run `npm test` to run the smart contract tests.