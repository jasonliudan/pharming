import * as constants from 'constants.js';
const initialState = { account: null };

export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
        case constants.SET_ACCOUNT:
            return {
                ...state,
                account: action.account
            }
        default:
            return state;
    }
}
