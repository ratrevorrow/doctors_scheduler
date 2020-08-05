import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { UserInformation } from './models';
import * as actions from './actions';

import { postProtocol } from '../../util/api';

export function* signIn(action?: Action<string>) {
  const { response, error } = yield call(postProtocol, 'http://127.0.0.1:8000/api/login', action?.payload);
  if (response) {
    const userInformation: UserInformation = response;
    localStorage.setItem('token', JSON.stringify(userInformation.token));
    localStorage.setItem('role', JSON.stringify(userInformation.user.role));
    yield put(actions.signIn.success(response));
  } else {
    yield put(actions.signIn.failure(error));
  }
}

export default function* exampleSagas() {
  yield all([takeLatest(actions.signIn.TRIGGER, signIn)]);
}
