export const SET_AUTHENTICATED = 'AUTH/SET_AUTHENTICATED';
export const GET_ACCESS_TOKEN = 'AUTH/GET_ACCESS_TOKEN';

export interface AuthState {
  authenticated: boolean
}

export interface SetAuthenticatedAction {
  type: typeof SET_AUTHENTICATED
  payload: boolean
}


export interface GetAccessTokenAction {
  type: typeof GET_ACCESS_TOKEN
  payload: string
}

export type AuthActionTypes = SetAuthenticatedAction | GetAccessTokenAction;