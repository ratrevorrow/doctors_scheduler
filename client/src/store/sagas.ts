import { all } from 'redux-saga/effects';

import userSagas from './user/sagas';

export function* rootSagas() {
  yield all([userSagas()]);
}
