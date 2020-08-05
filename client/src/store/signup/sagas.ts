import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import * as actions from './actions';

import { postProtocol } from '../../util/api';

export function* signUp(action?: Action<string>) {
  const { response, error } = yield call(postProtocol, 'http://127.0.0.1:8000/api/patients', action?.payload);
  if (response) {
    console.log(response);
    yield put(actions.signUp.success(response));
  } else {
    console.error('Error occurred while resetting password.  (sagas/signUp)');
    console.error(error);
    yield put(actions.signUp.failure(error));
  }
}

export default function* exampleSagas() {
  yield all([takeLatest(actions.signUp.TRIGGER, signUp)]);
}
