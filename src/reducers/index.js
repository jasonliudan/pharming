import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import poolReducer from './poolReducer';

export default combineReducers({
    accountReducer,
    poolReducer
});
