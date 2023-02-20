// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract WanCash is Initializable, ERC20Upgradeable, UUPSUpgradeable {
    address public owner;
    uint256 public maxSupply;
    modifier onlyOwner() {
        require(owner == _msgSender(), "Not authorized");
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(uint256 _maxSupply) initializer {
        maxSupply = _maxSupply;
    }

    function initialize(address initialOwner) initializer public {
        __ERC20_init("Wancash", "WCH");
        __UUPSUpgradeable_init();

        owner = initialOwner;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(maxSupply <= (amount + address(this).balance));
        _mint(to, amount);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
    }
}