import * as constants from 'constants.js';

export function setAccount(account) {
    return {
        type: constants.SET_ACCOUNT,
        account
    };
}
