// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract AdminBox is Initializable {
  uint256 private _value;
  address private _admin;

  event ValueChanged(uint256 value);

  function initialize(address admin) public initializer {
    _admin = admin;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  // Stores a new value in the contract
  function store(uint256 value) public {
    require(msg.sender == _admin, "AdminBox: not admin");
    _value = value;
    emit ValueChanged(_value);
  }

  function retrieve() public view returns(uint256) {
    return _value;
  }
}
