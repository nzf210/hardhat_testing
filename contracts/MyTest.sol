// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import The Hardhat Console
import "hardhat/console.sol";



contract MyTest {
    uint256 public unlockedTime;
    address payable public owner;

    event Widthrawalq(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        require(block.timestamp < _unlockTime, "Hanya bisa di unlock setelah batas waktu tiba");

        unlockedTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockedTime, "Tunggu sampai Waktu Selesai");
        require(msg.sender == owner, "Kamu Bukan Pemilik");
        emit Widthrawalq(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
        

    }
}
