import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import * as actions from './actions';

import { postProtocol } from '../../util/api';

export function* signUp(action?: Action<string>) {
  console.log(action?.payload);
  const { data, err } = yield call(postProtocol, 'http://127.0.0.1:8000/api/patients', action?.payload);
  if (data) {
    console.log(data);
    yield put(actions.signUp.success(data));
  } else {
    console.log(err);
    yield put(actions.signUp.failure(err));
  }
}

export default function* exampleSagas() {
  yield all([takeLatest(actions.signUp.TRIGGER, signUp)]);
}
