// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract WanCash is  ERC20Capped, ERC20Burnable {
    address payable public owner; 
    uint256 public reward;

    constructor(uint256 _initialSupply, uint256 _reward) 
    ERC20("WanCash","WCH") 
    ERC20Capped(_initialSupply * (10 ** decimals()))
    {
        owner = payable(msg.sender);
        _mint(owner , _initialSupply * (10 ** decimals()));
        reward = _reward * (10 ** decimals()); 
    }

    modifier onlyOwner {
        require(msg.sender == owner,"Only tHe Owner call this function");
        _;
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function setReward(uint256 _reward) public onlyOwner {
        reward = _reward * (10 ** decimals());
    }

    function _mintReward() internal {
        _mint(block.coinbase, reward);
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    function _beforeTokenTransfer(address _from, address _to, uint256 _value)internal virtual override {
        if(_from != address(0) && _to != block.coinbase && block.coinbase != address(0)){
            _mintReward();
        }
        super._beforeTokenTransfer(_from, _to, _value);
    }
}