// SPDX-License-Identifier: SEE LICENCE IN LICENSE
pragma solidity 0.8.24;

contract Auth {
  address user;

  constructor(address _deployer) {
    user = _deployer;
  }

  function authenticate(address _user) public view returns(bool) {
    return _user == user;
  }
}
