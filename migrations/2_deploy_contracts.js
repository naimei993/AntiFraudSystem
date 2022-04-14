<<<<<<< HEAD
=======
// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
>>>>>>> d8d587627a0775e8e6cf2351f1d105faef0aebd7
var AntiFraud = artifacts.require("AntiFraud");
var TokenERC20 = artifacts.require("TokenERC20");

module.exports = function(deployer) {
  // deployer.deploy(SimpleStorage);
  deployer.deploy(AntiFraud);
  deployer.deploy(TokenERC20, 100, "Credit", "$");
};
