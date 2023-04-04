import { AxiosResponse } from 'axios';
import { ToggleTaskType } from '../../types';
import { Task } from '../../types/task';
import { baseApi } from '../base';

export const getUserTasks = async (): Promise<Task[]> => {
  const res = await baseApi.get('/tasks/user');
  return res.data;
};

export const toggleIsCompleted = async (
  data: ToggleTaskType
): Promise<Task> => {
  const { isCompleted, taskId } = data;
  const res = await baseApi.patch(`/tasks/user/${taskId}`, { isCompleted });
  return res.data;
};

export const getAllTasks = async (): Promise<Task[]> => {
  return (await baseApi.get('/tasks')).data;
};

export const updateTask = (newData: {
  title: string;
  desc: string;
  isCompleted?: boolean;
  userId?: string;
  taskId: string;
}): Promise<AxiosResponse<Task>> => {
  return baseApi.patch(`/tasks/${newData.taskId}`, newData);
};

export const createTask = (newData: {
  title: string;
  desc: string;
  userId?: string;
}): Promise<AxiosResponse<Task>> => {
  return baseApi.post(`/tasks`, newData);
};

export const deleteTask = (taskId: string) => {
  return baseApi.delete(`/tasks/${taskId}`);
};
