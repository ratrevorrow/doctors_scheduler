import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import * as actions from './actions';

import { postProtocol } from '../../util/api';

export function* signIn(action?: Action<string>) {
  const { response, error } = yield call(postProtocol, 'http://127.0.0.1:8000/api/login', action?.payload);
  if (response) {
    yield put(actions.signIn.success(response));
  } else {
    yield put(actions.signIn.failure(error));
  }
}

export default function* exampleSagas() {
  yield all([takeLatest(actions.signIn.TRIGGER, signIn)]);
}
