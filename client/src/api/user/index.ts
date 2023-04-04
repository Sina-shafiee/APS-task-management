import { UpdateUser, User } from '../../types/user';
import { baseApi } from '../base';

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

export const updateUser = async (data: {
  name: string;
  email: string;
  skills: string[];
  language: string[];
  userId: string;
  social: {
    linkedin: string;
    github: string;
  };
}): Promise<User> => {
  const res = await baseApi.patch(`/users/${data.userId}`, data);
  return res.data;
};
