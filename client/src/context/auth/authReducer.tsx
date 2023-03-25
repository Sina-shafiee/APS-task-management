import { ActionType, InitialStateType } from './auth.types';

export const UPDATE_AUTH_STATE = 'UPDATE_AUTH_STATE';

export const reducer = (
  state: InitialStateType,
  action: ActionType
): InitialStateType => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_AUTH_STATE:
      return {
        ...state,
        token: payload?.token!,
        role: payload?.role!
      };

    default:
      return state;
  }
};
