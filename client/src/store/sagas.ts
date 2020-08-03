import { all } from 'redux-saga/effects';

import exampleSagas from './login/sagas';

export function* rootSagas() {
  yield all([exampleSagas()]);
}
