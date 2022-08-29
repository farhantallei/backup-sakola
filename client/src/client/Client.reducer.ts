import { AUTH_ACTION_TYPES } from '@app/constants';

export interface AuthAction {
  type: AUTH_ACTION_TYPES;
}

interface AuthState {
  isAuthenticated: boolean | null;
}

export const authInitialState = {
  isAuthenticated: null,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN:
      return { isAuthenticated: true };
    case AUTH_ACTION_TYPES.LOGOUT:
      return { isAuthenticated: false };
    default:
      return state;
  }
};
