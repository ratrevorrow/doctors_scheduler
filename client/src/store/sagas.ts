import { all } from 'redux-saga/effects';

import signUpSagas from './signup/sagas';
import signInSagas from './signin/sagas';

export function* rootSagas() {
  yield all([signUpSagas(), signInSagas()]);
}
