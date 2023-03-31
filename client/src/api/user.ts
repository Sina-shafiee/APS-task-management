import { AxiosResponse } from 'axios';
import { UpdateUser, User } from '../types/user';
import { baseApi } from './base';

export const updateCurrentUser = (data: UpdateUser) => {
  return baseApi.patch('/auth/me', data);
};

export const getSingleUser = (userId: string) => {
  return baseApi.get(`/users/${userId}`);
};

export const getAllUsers = (): Promise<AxiosResponse<User[], any>> => {
  return baseApi.get('/users');
};
