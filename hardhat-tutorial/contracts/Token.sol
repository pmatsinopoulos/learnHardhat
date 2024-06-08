// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

contract Token {
  string public name = "My Hadhat Token";
  string public symbol = "MHT";

  uint256 public totalSupply = 1_000_000;

  address public owner;

  mapping(address => uint256) balances;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address to, uint256 amount) external {
    require(balances[msg.sender] >= amount, "There is no enough tokens in your balance to transfer this amount");

    balances[to] += amount;
    balances[msg.sender] -= amount;

    emit Transfer(msg.sender, to, amount);
  }

  function balanceOf(address account) external view returns(uint256) {
    return balances[account];
  }
}
