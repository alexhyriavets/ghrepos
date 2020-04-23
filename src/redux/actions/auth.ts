import { SET_AUTHENTICATED, GET_ACCESS_TOKEN } from '../types';

export const setAuthenticated = (authenticated: boolean) => ({
  type: SET_AUTHENTICATED,
  payload: authenticated
});

export const getAccessToken = (code: string) => ({
  type: GET_ACCESS_TOKEN,
  payload: code
});