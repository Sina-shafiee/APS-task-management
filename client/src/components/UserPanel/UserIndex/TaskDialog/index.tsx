import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';

import { toggleIsCompleted } from '../../../../api';
import { TaskDialogProps } from './index.types';
import { Task } from '../../../../types/task';

const TaskDialog = ({
  handleClose,
  _id,
  title,
  desc,
  isCompleted,
  isFetching,
  open
}: TaskDialogProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: toggleIsCompleted,
    onSuccess(data) {
      const oldData = queryClient.getQueryData('user-tasks') as Task[];

      if (oldData) {
        const updatedData = oldData?.map((task) => {
          if (task._id === data._id) {
            task.isCompleted = data.isCompleted;
            return task;
          }
          return task;
        });

        queryClient.setQueryData('user-tasks', updatedData);
      }
    }
  });

  const handleToggleIsCompletedClick = () => {
    mutate({ isCompleted: !isCompleted, taskId: _id });
  };

  return (
    <div>
      <Dialog open={open} maxWidth='sm' fullWidth={true} onClose={handleClose}>
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
