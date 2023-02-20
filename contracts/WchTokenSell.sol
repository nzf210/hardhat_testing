// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 < 0.9.0 ;

import "./WchToken.sol";

contract WchTokenSell {
    address admin;
    WanCash public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(WanCash _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;        
    }

    function multiply(uint256 _x , uint256 _y) internal pure returns(uint256 _z){
        require(_y == 0 || (_z =_x*_y)/_y == _x);
        return _z; 
    }

    function buyToken (uint256 _numberOfToken) public payable {
        require(msg.value == multiply(_numberOfToken, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfToken);
        require(tokenContract.transfer(msg.sender, _numberOfToken));

        tokenSold += _numberOfToken;

        emit Sell(msg.sender, _numberOfToken);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        payable(admin).transfer(address(this).balance);
    }

}