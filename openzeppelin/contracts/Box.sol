// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

import "./access-control/Auth.sol";

contract Box {
  uint256 private _value;
  Auth private _auth;

  event ValueChanged(uint256 value);

  constructor() {
    _auth = new Auth(msg.sender);
  }


  modifier authenticate {
    require(_auth.authenticate(msg.sender), "You are not authenticated to use Box");
    _;
  }

  function store(uint256 value) public authenticate {
    _value = value;

    emit ValueChanged(value);
  }

  function retrieve() public view returns(uint256) {
    return _value;
  }
}
