import { Task } from '../../../../types/task';

export type TaskListProps = {
  tasks: Task[];
  isFetching: boolean;
};
