import { baseApi } from '../base';

import { ToggleTaskType } from '../../types';
import { CreateTaskType, Task, UpdateTaskType } from '../../types/task';

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
  const res = await baseApi.get('/tasks');
  return res.data;
};

export const updateTask = async (
  newData: UpdateTaskType & { taskId: string }
): Promise<Task> => {
  const res = await baseApi.patch(`/tasks/${newData.taskId}`, newData);
  return res.data;
};

export const createTask = async (newData: CreateTaskType): Promise<Task> => {
  const res = await baseApi.post(`/tasks`, newData);
  return res.data;
};

export const deleteTask = async (taskId: string): Promise<Task> => {
  const res = await baseApi.delete(`/tasks/${taskId}`);
  return res.data;
};
