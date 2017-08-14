import { take, takeLatest } from 'redux-saga/effects';
// import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { TEST_PAGE_DEFAULT_ACTION } from '../../constants/constants';

export function* handleDefaultAction(action) {
  console.log('handleDefaultAction', action);
}

export function* defaultSaga() {
  const watcher = yield takeLatest(
    TEST_PAGE_DEFAULT_ACTION,
    handleDefaultAction
  );
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [defaultSaga];
