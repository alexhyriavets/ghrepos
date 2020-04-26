import { all } from 'redux-saga/effects';
import { fetchAccessTokenWatcher } from './auth/sagas';

export default function* rootSaga() {
  yield all([
    fetchAccessTokenWatcher(),
  ]);
}