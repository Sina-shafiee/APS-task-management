import { UpdateUser } from '../types/user';
import { baseApi } from './base';

export const updateCurrentUser = (data: UpdateUser) => {
  return baseApi.patch('/auth/me', data);
};
