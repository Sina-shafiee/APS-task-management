import { Task } from '../../../../types/task';

export type TaskDialogProps = {
  handleClose(): void;
  isFetching: boolean;
  open: boolean;
} & Task;
