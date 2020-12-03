import * as constants from 'constants.js';

export const poolSetPoolInfo = (payload) => {
    return {
        type: constants.POOL_SET_POOL_INFO,
        payload,
    };
}

export const poolSetStakeTokenInfo = (payload) => {
    return {
        type: constants.POOL_SET_STAKE_TOKEN_INFO,
        payload
    }
};

export const poolSetRewardTokenInfo = (payload) => {
    return {
        type: constants.POOL_SET_REWARD_TOKEN_INFO,
        payload
    }
};

export const poolSetContract = (payload) => {
    return {
        type: constants.POOL_SET_CONTRACT,
        payload
    }
};

export const poolSetStakeTokenContract = (payload) => {
    return {
        type: constants.POOL_SET_STAKE_TOKEN_CONTRACT,
        payload
    }
};

export const poolSetRewardTokenContract = (payload) => {
    return {
        type: constants.POOL_SET_REWARD_TOKEN_CONTRACT,
        payload
    }
};

export const poolApproveToken = () => {
    return {
        type: constants.POOL_APPROVE_TOKEN
    };
}
export const poolLoadAllowance = () => {
    return {
        type: constants.POOL_LOAD_ALLOWANCE
    }
};

export const poolApproveTokenSuccess = (payload) => {
    return {
        type: constants.POOL_APPROVE_TOKEN_SUCCESS,
        payload
    }
};

export const poolStake = (payload) => {
    return {
        type: constants.POOL_STAKE,
        payload
    }
};

export const poolWithdraw = (payload) => {
    return {
        type: constants.POOL_WITHDRAW_ALL,
        payload
    }
};

export const poolHarvest = () => {
    return {
        type: constants.POOL_HARVEST
    }
};

export const poolExit = () => {
    return {
        type: constants.POOL_EXIT
    }
};

export const poolGetEarned = () => {
    return {
        type: constants.POOL_GET_EARNED
    }
};

export const poolGetEarnedSuccess = (payload) => {
    return {
        type: constants.POOL_GET_EARNED_SUCCESS,
        payload
    }
};

export const poolGetStaked = () => {
    return {
        type: constants.POOL_GET_STAKED
    }
};

export const poolGetStakedSuccess = (payload) => {
    return {
        type: constants.POOL_GET_STAKED_SUCCESS,
        payload
    }
};

export const poolGetStakeTokenBalance = () => {
    return {
        type: constants.POOL_GET_STAKE_TOKEN_BALANCE
    }
};

export const poolGetStakeTokenBalanceSuccess = (payload) => {
    return {
        type: constants.POOL_GET_STAKE_TOKEN_BALANCE_SUCCESS,
        payload
    }
};

export const poolGetTotalStakedSuccess = (payload) => {
    return {
        type: constants.POOL_GET_TOTAL_STAKED_SUCCESS,
        payload
    }
};

export const poolGetPeriodFinish = () => {
    return {
        type: constants.POOL_GET_PERIOD_FINISH
    }
};

export const poolGetPeriodFinishSuccess = (payload) => {
    return {
        type: constants.POOL_GET_PERIOD_FINISH_SUCCESS,
        payload
    }
};

export const poolGetMaximumStakingAmount = () => {
    return {
        type: constants.POOL_GET_MAXIMUM_STAKING_AMOUNT
    }
}
export const poolGetMaximumStakingAmountSuccess = (payload) => {
    return {
        type: constants.POOL_GET_MAXIMUM_STAKING_AMOUNT_SUCCESS,
        payload
    }
}
export const poolGetStakedTokenWithdrawableDates = ()=>{
    return {
        type: constants.POOL_GET_STAKED_TOKEN_WITHDRAWABLE_DATES
    }
}
export const poolGetStakedTokenWithdrawableDatesSuccess = (payload)=>{
    return {
        type: constants.POOL_GET_STAKED_TOKEN_WITHDRAWABLE_DATES_SUCCESS,
        payload
    }
}
export const poolGetLockedTokenBalance = () =>{
    return {
        type: constants.POOL_GET_LOCKED_TOKEN_BALANCE
    }
}
export const poolGetLockedTokenBalanceSuccess = (payload) =>{
    return {
        type: constants.POOL_GET_LOCKED_TOKEN_BALANCE_SUCCESS,
        payload
    }
}