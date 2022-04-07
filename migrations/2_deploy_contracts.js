// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var AntiFraud = artifacts.require("AntiFraud");
var TokenERC20 = artifacts.require("TokenERC20");

module.exports = function(deployer) {
  // deployer.deploy(SimpleStorage);
  deployer.deploy(AntiFraud);
  deployer.deploy(TokenERC20, 100, "Credit", "$");
};
