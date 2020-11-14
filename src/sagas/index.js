import { all, fork } from 'redux-saga/effects';

import watchPoolSaga from './watchers/poolSaga';

export default function* root() {
    yield all([
        fork(watchPoolSaga),
    ]);
}
