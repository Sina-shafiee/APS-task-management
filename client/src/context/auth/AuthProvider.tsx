import { createContext, useReducer } from 'react';
import { ContextProps, InitialStateType } from './auth.types';
import { reducer, UPDATE_AUTH_STATE } from './authReducer';

export const authContext = createContext<ContextProps & InitialStateType>({
  role: '',
  token: '',
  login: () => {}
});

const initialState: InitialStateType = {
  token: null,
  role: null
};

export const AuthProvider = () => {
  const [authState, dispatch] = useReducer(reducer, initialState);
  const { token, role } = authState;

  const login = (token: string, role: string): void => {
    dispatch({ type: UPDATE_AUTH_STATE, payload: { token, role } });
  };

  return (
    <authContext.Provider value={{ role, token, login }}>
      AuthProvider
    </authContext.Provider>
  );
};
