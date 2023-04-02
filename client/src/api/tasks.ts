import { AxiosResponse } from 'axios';
import { Task } from '../types/task';
import { baseApi } from './base';

export const getUserTasks = (): Promise<AxiosResponse<Task[]>> => {
  return baseApi.get('/tasks/user');
};

export const toggleIsCompleted = ({
  isCompleted,
  taskId
}: {
  isCompleted: boolean;
  taskId: string;
}) => {
  return baseApi.patch(`/tasks/user/${taskId}`, { isCompleted });
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
