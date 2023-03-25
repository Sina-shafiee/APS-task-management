export type InitialStateType = {
  token: null | string;
  role: null | string;
};

export type ContextProps = {
  login: (t: string, r: string) => void;
};

export type ActionType = {
  type: string;
  payload?: InitialStateType;
};
