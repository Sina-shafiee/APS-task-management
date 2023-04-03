
import { UpdateUser, User } from '../types/user';
import { baseApi } from './base';

export const updateCurrentUser = (data: UpdateUser) => {
  return baseApi.patch('/auth/me', data);
};

export const getSingleUser = (userId: string) => {
  return baseApi.get(`/users/${userId}`);
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await baseApi.get('/users');
  return res.data;
};
