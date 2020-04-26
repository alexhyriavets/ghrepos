import { combineReducers } from 'redux';

import { auth } from './auth/reducers';

export const rootReducer = combineReducers({
  auth
});

export type RootState = ReturnType<typeof rootReducer>;