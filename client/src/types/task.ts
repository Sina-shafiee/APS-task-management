export type Task = {
  _id: string;
  title: string;
  desc: string;
  isCompleted: boolean;
  userId: string;
  createdAt: string;
};

export type CreateTaskType = {
  title: string;
  desc: string;
  userId: string;
};

export type UpdateTaskType = CreateTaskType;
