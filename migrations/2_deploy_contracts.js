// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Main = artifacts.require("Main");

module.exports = function(deployer) {
  deployer.deploy(Main);
};
