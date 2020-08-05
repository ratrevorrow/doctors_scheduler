import { all } from 'redux-saga/effects';

import signUpSagas from './signup/sagas';
import signInSagas from './signin/sagas';
import createUserSagas from './createuser/sagas';

export function* rootSagas() {
  yield all([signUpSagas(), signInSagas(), createUserSagas()]);
}
