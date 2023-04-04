import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toggleIsCompleted } from '../../../../../api/task';
import { Task } from '../../../../../types/task';

export type TaskDialogProps = {
  handleClose(): void;
  isFetching: boolean;
} & Task;

const TaskDialog = ({
  handleClose,
  _id,
  title,
  desc,
  isCompleted,
  isFetching
}: TaskDialogProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: toggleIsCompleted,
    onSuccess() {
      const res: AxiosResponse<Task[]> | undefined =
        queryClient.getQueryData('user-tasks');

      if (res) {
        const newData = res.data.map((task) => {
          if (task._id === _id) {
            task.isCompleted = !task.isCompleted;
            return task;
          }
          return task;
        });
        res.data = newData;
        queryClient.setQueryData('user-tasks', res);
      }
    }
  });

  const handleToggleIsCompletedClick = () => {
    mutate({ isCompleted: !isCompleted, taskId: _id });
  };

  return (
    <div>
      <Dialog open={true} maxWidth='sm' fullWidth={true} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ maxHeight: '200px' }}>
          <DialogContentText>{desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button
            variant='contained'
            color={isCompleted ? 'warning' : 'success'}
            disabled={isLoading || isFetching}
            onClick={handleToggleIsCompletedClick}
          >
            {isCompleted ? 'Undo' : 'Mark as done'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default TaskDialog;
