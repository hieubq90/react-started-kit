import { take, takeLatest } from 'redux-saga/effects';
// import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GLOBAL_DEFAULT_ACTION,
  TEST_PAGE_DEFAULT_ACTION,
} from '../../constants/constants';

export function* handleLocationChange() {
  console.log('handleLocationChange');
}

export function* handleGlobalDefaultAction(action) {
  console.log('handleGlobalDefaultAction', action);
}

export function* handleTestPageDefaultAction(action) {
  console.log('handleTestPageDefaultAction', action);
}

export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(GLOBAL_DEFAULT_ACTION, handleGlobalDefaultAction);
  yield take(LOCATION_CHANGE, handleLocationChange);
}

export function* testPageSaga() {
  yield takeLatest(TEST_PAGE_DEFAULT_ACTION, handleTestPageDefaultAction);
}

export default [defaultSaga, testPageSaga];
