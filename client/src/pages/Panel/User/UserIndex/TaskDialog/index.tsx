import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from 'react-query';
import { toggleIsCompleted } from '../../../../../api/tasks';
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
      queryClient.invalidateQueries(['user-tasks']);
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
