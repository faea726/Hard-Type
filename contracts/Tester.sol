// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tester is ERC20 {
    uint8 private _decimals;

    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        uint8 tokenDecimals_,
        uint256 totalSupply_
    ) ERC20(tokenName_, tokenSymbol_) {
        _decimals = tokenDecimals_;
        _mint(msg.sender, totalSupply_ * 10**decimals());
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
