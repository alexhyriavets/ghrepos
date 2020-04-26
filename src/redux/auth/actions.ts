import { SET_AUTHENTICATED, GET_ACCESS_TOKEN, AuthActionTypes } from './types';

export const setAuthenticated = (authenticated: boolean): AuthActionTypes => ({
  type: SET_AUTHENTICATED,
  payload: authenticated
});

export const getAccessToken = (code: string): AuthActionTypes => ({
  type: GET_ACCESS_TOKEN,
  payload: code
});