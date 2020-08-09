import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { UserInformation } from './models';
import * as actions from './actions';

import { postProtocol } from '../../util/api';

const URI = {
  LOGIN: 'http://127.0.0.1:8000/api/login',
  CREATEUSER: 'http://127.0.0.1:8000/api/createuser',
  RESETPASSWORD: 'http://127.0.0.1:8000/api/patients',
};

export function* signIn(action?: Action<string>) {
  const { response, error } = yield call(postProtocol, URI.LOGIN, action?.payload);
  if (response) {
    const userInformation: UserInformation = response;
    localStorage.setItem('token', JSON.stringify(userInformation.token));
    localStorage.setItem('role', JSON.stringify(userInformation.user.role));
    yield put(actions.signIn.success(response));
  } else {
    console.error('Error occurred while signing user in. (sagas/signin)');
    console.error(error.error);
    yield put(actions.signIn.failure(error));
  }
}

export function* createUser(action?: Action<string>) {
  const { response, error } = yield call(postProtocol, URI.CREATEUSER, action?.payload);
  if (response) {
    console.log(response);
    yield put(actions.createUser.success(response));
  } else {
    console.log(error);
    yield put(actions.createUser.failure(error));
  }
}

export function* signUp(action?: Action<string>) {
  const { response, error } = yield call(postProtocol, URI.RESETPASSWORD, action?.payload);
  if (response) {
    console.log(response);
    yield put(actions.resetPassword.success(response));
  } else {
    console.error('Error occurred while resetting password.  (sagas/signUp)');
    console.error(error);
    yield put(actions.resetPassword.failure(error));
  }
}

export default function* exampleSagas() {
  yield all([
    takeLatest(actions.signIn.TRIGGER, signIn),
    takeLatest(actions.createUser.TRIGGER, createUser),
    takeLatest(actions.resetPassword.TRIGGER, signUp),
  ]);
}
