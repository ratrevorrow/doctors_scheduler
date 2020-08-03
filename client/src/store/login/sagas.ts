import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import * as actions from './actions';

import { postProtocol } from '../../util/api';

export function* signUp(action?: Action<any>) {
  const { data, err } = yield call(postProtocol, 'http://127.0.0.1:8000/api/patients', action?.payload);
  if (data) {
    yield put({ type: 'FETCH_SUCCEEDED', data });
  } else {
    yield put({ type: 'FETCH_FAILED', err });
  }
}

export default function* exampleSagas() {
  yield all([takeLatest(actions.signUp.TRIGGER, signUp)]);
}
