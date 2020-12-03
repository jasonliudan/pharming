import { put, takeLatest, select } from 'redux-saga/effects';
import * as constants from 'constants.js';

import web3client from 'api/web3client';
import {
    poolApproveTokenSuccess,
    poolGetEarnedSuccess,
    poolGetStaked,
    poolGetEarned,
    poolGetStakedSuccess,
    poolGetStakeTokenBalanceSuccess,
    poolGetStakeTokenBalance,
    poolGetTotalStakedSuccess,
    poolGetPeriodFinishSuccess,
    poolGetMaximumStakingAmountSuccess,
    poolGetStakedTokenWithdrawableDatesSuccess,
    poolGetLockedTokenBalanceSuccess
} from 'actions/poolActions';

function* loadAllowance() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const stakeTokenContract = state.poolReducer.stakeTokenContract;
        const poolInfo = state.poolReducer.poolInfo;
        if (!account || !stakeTokenContract || !poolInfo) return;

        const allowance = yield web3client.allowance(stakeTokenContract, account, poolInfo.address);
        yield put(poolApproveTokenSuccess(allowance));
    } catch (err) {
        yield put(poolApproveTokenSuccess(0));
    }
}

function* approve() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const stakeTokenContract = state.poolReducer.stakeTokenContract;
        const poolInfo = state.poolReducer.poolInfo;
        if (!account || !stakeTokenContract || !poolInfo) return;

        yield web3client.approve(stakeTokenContract, poolInfo.address, account);
        const allowance = yield web3client.allowance(stakeTokenContract, account, poolInfo.address);
        console.log(allowance)
        yield put(poolApproveTokenSuccess(allowance));
    } catch (err) {
        yield put(poolApproveTokenSuccess(0));
    }
}


function* stake({ payload }) {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        const stakingTokenInfo = state.poolReducer.stakeTokenInfo;

        if (!account || !poolContract || !stakingTokenInfo) return;
        yield web3client.poolStake(poolContract, payload, stakingTokenInfo.decimals, account);
        yield put(poolGetStaked());
    } catch (err) {
        console.error(err);
    }
}

function* withdrawAll() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        if (!account || !poolContract) return;

        yield web3client.poolWithdrawAll(poolContract, account);
        yield put(poolGetStaked());
    } catch (err) {

    }
}

function* harvest() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        if (!account || !poolContract) return;
        yield web3client.poolHarvest(poolContract, account);
        yield put(poolGetEarned());
    } catch (err) {

    }
}

function* exit() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        if (!account || !poolContract) return;
        yield web3client.poolExit(poolContract, account.address);
        yield put(poolGetStaked());
        yield put(poolGetEarned());
        yield put(poolGetStakeTokenBalance());
    } catch (err) {

    }
}

function* getEarned() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        if (!account || !poolContract) return;

        const earned = yield web3client.poolGetEarned(poolContract, account);
        yield put(poolGetEarnedSuccess(earned));
    } catch (err) {

    }
}

function* getStaked() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        if (!account || !poolContract) return;

        const staked = yield web3client.getBalance(poolContract, account);
        const totalStaked = yield web3client.getTotalSupply(poolContract);
        yield put(poolGetStakedSuccess(staked));
        yield put(poolGetTotalStakedSuccess(totalStaked));
        yield put(poolGetStakeTokenBalance());
    } catch (err) {

    }
}

function* getStakeTokenBalance() {
    try {
        const state = yield select();
        const account = state.accountReducer.account;
        const stakeTokenContract = state.poolReducer.stakeTokenContract;
        if (!account || !stakeTokenContract) return;

        const balance = yield web3client.getBalance(stakeTokenContract, account);
        yield put(poolGetStakeTokenBalanceSuccess(balance));
    } catch (err) {
        console.error(err);
    }
}

function* getPeriodFinish() {
    try {
        const state = yield select();
        const poolContract = state.poolReducer.contract;
        if (!poolContract) return;

        const period = yield web3client.poolGetPeriodFinish(poolContract);
        yield put(poolGetPeriodFinishSuccess(period));
    } catch (err) {
        yield put(poolGetPeriodFinishSuccess(new Date()));
    }
}

function* getMaximumStakingAmount() {
    try {
        const state = yield select();
        const poolContract = state.poolReducer.contract;
        if (!poolContract) return;
        
        const maximumStakingAmount = yield web3client.getMaximumStakingAmount(poolContract);
        yield put(poolGetMaximumStakingAmountSuccess(maximumStakingAmount));
    } catch (err) {
        yield put(poolGetMaximumStakingAmountSuccess(new Date()));
    }
}

function* getStakedTokenWithdrawableDates(){
    try{
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        if (!account || !poolContract) return;

        const withdrawableDate = yield web3client.getStakedTokenWithdrawableDates(poolContract, account);
        yield put(poolGetStakedTokenWithdrawableDatesSuccess(withdrawableDate));
    }catch(err){
        console.log(err)
    }
}

function* getLockedTokenBalance(){
    try{
        const state = yield select();
        const account = state.accountReducer.account;
        const poolContract = state.poolReducer.contract;
        if (!account || !poolContract) return;

        const lockedTokenBalance = yield web3client.getLockedTokenBalance(poolContract, account);
        yield put(poolGetLockedTokenBalanceSuccess(lockedTokenBalance));
    }catch(err){
        console.log(err)
    }
}
export default function* watchGetUsersSaga() {
    yield takeLatest(constants.POOL_LOAD_ALLOWANCE, loadAllowance);
    yield takeLatest(constants.POOL_APPROVE_TOKEN, approve);
    yield takeLatest(constants.POOL_STAKE, stake);
    yield takeLatest(constants.POOL_WITHDRAW_ALL, withdrawAll);
    yield takeLatest(constants.POOL_HARVEST, harvest);
    yield takeLatest(constants.POOL_EXIT, exit);
    yield takeLatest(constants.POOL_GET_EARNED, getEarned);
    yield takeLatest(constants.POOL_GET_STAKED, getStaked);
    yield takeLatest(constants.POOL_GET_STAKE_TOKEN_BALANCE, getStakeTokenBalance);
    yield takeLatest(constants.POOL_GET_PERIOD_FINISH, getPeriodFinish);
    yield takeLatest(constants.POOL_GET_MAXIMUM_STAKING_AMOUNT, getMaximumStakingAmount);
    yield takeLatest(constants.POOL_GET_STAKED_TOKEN_WITHDRAWABLE_DATES, getStakedTokenWithdrawableDates);
    yield takeLatest(constants.POOL_GET_LOCKED_TOKEN_BALANCE, getLockedTokenBalance);
}