import { SET_AUTHENTICATED, AuthState, AuthActionTypes } from './types';

const initialState: AuthState = {
  authenticated: false
};

export const auth = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return ({
        ...state,
        authenticated: action.payload
      });

    default:
      return state;
  }
};