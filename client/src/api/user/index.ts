import { CreateUser, UpdateUser, User } from '../../types/user';
import { baseApi } from '../base';

export const updateCurrentUser = async (data: UpdateUser): Promise<User> => {
  const res = await baseApi.patch('/auth/me', data);
  return res.data;
};

export const getSingleUser = async (userId: string): Promise<User> => {
  const res = await baseApi.get(`/users/${userId}`);
  return res.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await baseApi.get('/users');
  return res.data;
};

export const updateUser = async (
  data: UpdateUser & { userId: string }
): Promise<User> => {
  const res = await baseApi.patch(`/users/${data.userId}`, data);
  return res.data;
};

export const deleteUser = async (userId: string): Promise<User> => {
  const res = await baseApi.delete(`/users/${userId}`);
  return res.data;
};

export const createUser = async (data: CreateUser): Promise<User> => {
  const res = await baseApi.post('/users', data);
  return res.data;
};
