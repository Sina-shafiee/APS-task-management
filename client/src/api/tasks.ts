import { AxiosResponse } from 'axios';
import { Task } from '../types/task';
import { baseApi } from './base';

export const getUserTasks = async (): Promise<AxiosResponse<Task[]>> => {
  return baseApi.get('/tasks/user');
};

export const toggleIsCompleted = async ({
  isCompleted,
  taskId
}: {
  isCompleted: boolean;
  taskId: string;
}) => {
  return baseApi.patch(`/tasks/user/${taskId}`, { isCompleted });
};
