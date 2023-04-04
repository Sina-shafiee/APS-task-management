import { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Dialog, DialogActions } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { deleteTask, getSingleUser } from '../../../../api';

import { EditForm } from './EditForm';
import { InitialContent } from './InitialContent';

import { Task } from '../../../../types/task';
import { ViewTaskDialogProps } from './index.types';

export const ViewTaskDialog = ({
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

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      const prevTaskList = queryClient.getQueryData('all-tasks') as Task[];
      const filterDeleted = prevTaskList?.filter(
        (task) => task._id !== data._id
      );

      queryClient.setQueryData('all-tasks', filterDeleted);
      toast.success('Task deleted');
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const setEditing = () => {
    setIsEditing(true);
  };
  const setNotEditing = () => {
    setIsEditing(false);
  };
  const deleteTaskFnc = () => {
    mutate(_id);
  };

  return (
    <Dialog open={true} maxWidth='sm' fullWidth={true} onClose={closeModal}>
      {!isEditing ? (
        <>
          <InitialContent
            userName={data?.name}
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
                onClick={deleteTaskFnc}
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
