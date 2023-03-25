import { AxiosResponse } from 'axios';
import { UserLoginType, UserRegisterType } from '../types';
import { User } from '../types/user';
import { baseApi } from './base';

export const signUp = (data: UserRegisterType) => {
  return baseApi.post('/auth/sign-up', data);
};

export const login = (data: UserLoginType) => {
  return baseApi.post('/auth/login', data);
};

export const getCurrentUser = (): Promise<AxiosResponse<User, any>> => {
  return baseApi.get('/auth/me');
};

export const logoutUser = async (): Promise<string> => {
  const { data } = await baseApi.get('/auth/logout');

  console.log(data);

  return data?.message;
};

export const refreshToken = async (): Promise<string> => {
  const { data } = await baseApi.get('/auth/refresh');
  return data.token;
};
