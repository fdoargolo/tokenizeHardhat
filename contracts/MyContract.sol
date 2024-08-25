// contracts/MyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public myNumber;

    function setNumber(uint256 _number) public {
        myNumber = _number;
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }
}
