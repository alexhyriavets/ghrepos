import { all, takeEvery, call, put } from 'redux-saga/effects';
import { GET_ACCESS_TOKEN, SET_AUTHENTICATED } from './types';
import { fetchAccessToken, setAuthorizationHeader } from '../services/AuthService';
import { LocalStorageService } from '../services/StorageService';

function* fetchAccessTokenWorker({ payload: code }) {
  const { accessToken } = yield call(fetchAccessToken, code);

  setAuthorizationHeader(accessToken);
  LocalStorageService.set('accessToken', accessToken);

  // @ts-ignore
  yield put({ type: SET_AUTHENTICATED, payload: true });
}

function* fetchAccessTokenWatcher() {
  // @ts-ignore
  yield takeEvery(GET_ACCESS_TOKEN, fetchAccessTokenWorker);
}

export default function* rootSaga() {
  yield all([
    fetchAccessTokenWatcher(),
  ]);
}