import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_ACCESS_TOKEN, SET_AUTHENTICATED, GetAccessTokenAction, AuthActionTypes } from './types';
import { LocalStorageService } from '../../services/StorageService';
import { fetchAccessToken, setAuthorizationHeader } from '../../services/AuthService';

function* fetchAccessTokenWorker({ payload: code }: GetAccessTokenAction) {
  const { accessToken }: { accessToken: string } = yield call(fetchAccessToken, code);

  setAuthorizationHeader(accessToken);
  LocalStorageService.set('accessToken', accessToken);

  yield put<AuthActionTypes>({ type: SET_AUTHENTICATED, payload: true });
}

export function* fetchAccessTokenWatcher() {
  yield takeEvery(GET_ACCESS_TOKEN, fetchAccessTokenWorker);
}