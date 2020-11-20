var Phantasma = artifacts.require("StakingRewards");
module.exports = function (deployer, network, accounts) {
    deployer.deploy(Phantasma, accounts[0], accounts[0], process.env.REWARD_TOKEN, process.env.STAkiNG_TOKEN);
    // Additional contracts can be deployed here
};