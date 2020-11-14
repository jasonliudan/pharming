import Web3 from 'web3';
import Config from 'lib/config';

let web3 = window.web3;
let ethereum = window.ethereum;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(Web3.givenProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(Config.provider));
}


async function getAccount() {
    await ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}
async function approve(contract, address, from) {
    const max = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    await contract.methods.approve(address, max).send({ from })
        .on('error', function (error, receipt) {
            console.log(error, receipt);
        });
}

async function allowance(contract, owner, spender) {
    const result = await contract.methods.allowance(owner, spender).call();
    return result;
}

/**
 * Common Contract Functions
 */
function getContract(abi, address) {
    return new web3.eth.Contract(abi, address);
}
async function getBalance(contract, address) {
    const _address = address || getAccount();
    const result = await contract.methods.balanceOf(_address).call();
    return parseInt(result);
}

async function getTotalSupply(contract) {
    const result = await contract.methods.totalSupply().call();
    return parseInt(result);
}

/**
 * StakingRewards Pool Contract Functions
 */
function precision(a) {
    if (!isFinite(a)) return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) { e *= 10; p++; }
    return p;
}
async function poolStake(contract, amount, tokenDecimals, from) {
    const precision_ = precision(amount);
    const amount_ = Web3.utils.toBN(amount * 10 ** precision_);
    const pow_ = Web3.utils.toBN(10 ** (tokenDecimals - precision_));
    await contract.methods.stake(amount_.mul(pow_)).send({ from, gas: 200000 })
        .on('error', function (error, receipt) {
            console.log(error, receipt);
        });
}

/*
async function poolWithdraw(contract, amount, tokenDecimals, from) {
    const precision_ = precision(amount);
    const amount_ = Web3.utils.toBN(amount * 10 ** precision_);
    const pow_ = Web3.utils.toBN(10 ** (tokenDecimals - precision_));
    await contract.methods.withdraw(amount_.mul(pow_)).send({ from, gas: 200000 })
        .on('error', function (error, receipt) {
            console.log(error, receipt);
        });
}*/

async function poolWithdrawAll(contract, from) {
    await contract.methods.withdrawAll().send({ from, gas: 200000 })
        .on('error', function (error, receipt) {

            console.log('here')
            console.log(error, receipt);
        });
}

async function poolHarvest(contract, from) {
    await contract.methods.getReward().send({ from, gas: 200000 })
        .on('error', function (error, receipt) {
            console.log(error, receipt);
        });
}

async function poolExit(contract, from) {
    await contract.methods.exit().send({ from, gas: 200000 })
        .on('error', function (error, receipt) {
            console.log(error, receipt);
        });
}

async function poolGetEarned(contract, address) {
    const result = await contract.methods.earned(address).call();
    return result;
}

async function poolGetPeriodFinish(contract) {
    const periodFinish = await contract.methods.periodFinish().call();
    return new Date(parseInt(periodFinish) * 1000);
}

async function poolGetRewardRate(contract) {
    const result = await contract.methods.rewardPerToken().call();
    return result;
}

export default {
    getAccount,
    getContract,
    getBalance,
    getTotalSupply,
    approve,
    allowance,
    poolGetEarned,
    poolGetPeriodFinish,
    poolGetRewardRate,
    poolStake,
    poolWithdrawAll,
    poolHarvest,
    poolExit
};
