import * as constants from 'constants.js';
const initialState = {
    contract: null,
    stakeTokenContract: null,
    rewardTokenContract: null,
    poolInfo: null,
    stakeTokenInfo: null,
    rewardTokenInfo: null,
    allowance: 0,
    staked: 0,
    totalStaked: 0,
    stakeTokenBalance: 0,
    earned: 0,
    periodFinish: new Date(),
    maximumStakingAmount: 0
};

export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
        case constants.POOL_SET_POOL_INFO:
            return {
                ...state,
                poolInfo: action.payload
            }
        case constants.POOL_SET_STAKE_TOKEN_INFO:
            return {
                ...state,
                stakeTokenInfo: action.payload
            }
        case constants.POOL_SET_REWARD_TOKEN_INFO:
            return {
                ...state,
                rewardTokenInfo: action.payload
            }
        case constants.POOL_SET_CONTRACT:
            return {
                ...state,
                contract: action.payload
            }
        case constants.POOL_SET_STAKE_TOKEN_CONTRACT:
            return {
                ...state,
                stakeTokenContract: action.payload
            }
        case constants.POOL_SET_REWARD_TOKEN_CONTRACT:
            return {
                ...state,
                rewardTokenContract: action.payload
            }
        case constants.POOL_APPROVE_TOKEN_SUCCESS:
            return {
                ...state,
                allowance: action.payload
            }
        case constants.POOL_GET_STAKED_SUCCESS:
            return {
                ...state,
                staked: action.payload
            }
        case constants.POOL_GET_EARNED_SUCCESS:
            return {
                ...state,
                earned: action.payload
            }
        case constants.POOL_GET_STAKE_TOKEN_BALANCE_SUCCESS:
            return {
                ...state,
                stakeTokenBalance: action.payload
            }
        case constants.POOL_GET_TOTAL_STAKED_SUCCESS:
            return {
                ...state,
                totalStaked: action.payload
            }
        case constants.POOL_GET_PERIOD_FINISH_SUCCESS:
            return {
                ...state,
                periodFinish: action.payload
            }
        case constants.POOL_GET_MAXIMUM_STAKING_AMOUNT_SUCCESS:
            return {
                ...state,
                maximumStakingAmount: action.payload
            }
        default:
            return state;
    }
}
