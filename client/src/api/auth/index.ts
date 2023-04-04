import { baseApi } from '../base';

import { User } from '../../types/user';

import {
  SuccessLoginResponseType,
  UserLoginType,
  UserRegisterType
} from '../../types';

export const signUp = async (
  data: UserRegisterType
): Promise<{ message: string }> => {
  const res = await baseApi.post('/auth/sign-up', data);
  return res.data;
};

export const login = async (
  data: UserLoginType
): Promise<SuccessLoginResponseType> => {
  const res = await baseApi.post('/auth/login', data);
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await baseApi.get('/auth/me');
  return res.data;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const res = await baseApi.get('/auth/logout');
  return res.data;
};

export const refreshToken = async (): Promise<string> => {
  const { data } = await baseApi.get('/auth/refresh');
  return data.token;
};
