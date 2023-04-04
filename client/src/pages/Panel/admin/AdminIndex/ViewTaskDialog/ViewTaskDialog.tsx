import { Box, Button, Dialog, DialogActions } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTask } from '../../../../../api/task';
import { getSingleUser } from '../../../../../api/user';
import { Task } from '../../../../../types/task';
import EditForm from './EditForm';
import InitialContent from './InitialContent';

type ViewTaskDialogProps = Task & {
  closeModal(): void;
};

const ViewTaskDialog = ({
  title,
  desc,
  isCompleted,
  userId,
  closeModal,
  createdAt,
  _id
}: ViewTaskDialogProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    staleTime: Infinity,
    retry: 1,
    queryFn: (context) => {
      const { queryKey } = context;
      return getSingleUser(queryKey[1]);
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  const setEditing = () => {
    setIsEditing(true);
  };
  const setNotEditing = () => {
    setIsEditing(false);
  };

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (res) => {
      const prevTaskList: Task[] | undefined =
        queryClient.getQueryData('all-tasks');
      const filterDeleted = prevTaskList?.filter((task) => task._id !== _id);

      queryClient.setQueryData('all-tasks', filterDeleted);
    }
  });

  return (
    <Dialog open={true} maxWidth='sm' fullWidth={true} onClose={closeModal}>
      {!isEditing ? (
        <>
          <InitialContent
            userName={data?.data?.name}
            title={title}
            isCompleted={isCompleted}
            createdAt={createdAt}
            desc={desc}
            isLoading={isLoading}
          />
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button autoFocus onClick={closeModal}>
              Close
            </Button>
            <Box>
              <Button
                onClick={() => mutate(_id)}
                color='warning'
                variant='contained'
              >
                Delete
              </Button>
              <Button
                sx={{ ml: '.4rem' }}
                onClick={setEditing}
                variant='contained'
              >
                Edit
              </Button>
            </Box>
          </DialogActions>
        </>
      ) : (
        <EditForm
          title={title}
          userId={userId}
          desc={desc}
          closeModal={closeModal}
          _id={_id}
          setNotEditing={setNotEditing}
        />
      )}
    </Dialog>
  );
};

export default ViewTaskDialog;
