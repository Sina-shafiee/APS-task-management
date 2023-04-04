import { Task } from '../../../../types/task';

export type ViewTaskDialogProps = Task & {
  closeModal(): void;
};
