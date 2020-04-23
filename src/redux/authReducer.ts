import { SET_AUTHENTICATED } from './types';

const initialState = {
  authenticated: false
};

export const Auth = (state = initialState, action: any = {}) => {
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