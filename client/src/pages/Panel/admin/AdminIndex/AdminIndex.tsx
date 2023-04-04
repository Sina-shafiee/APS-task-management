import {
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';

import { useState } from 'react';

import { useQuery } from 'react-query';
import { getAllTasks } from '../../../../api';

import { FetchError } from '../../../../components/Global';
import {
  TaskList,
  CreateTask
} from '../../../../components/AdminPanel/AdminIndex';

const AdminIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryFn: getAllTasks,
    queryKey: ['all-tasks'],
    staleTime: Infinity,
    cacheTime: Infinity
  });

  if (isLoading) {
    return <LinearProgress color='secondary' />;
  }

  if (isError) {
    return <FetchError />;
  }

  const openCreateTaskModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <Container component='main' maxWidth='lg' sx={{ p: '1rem' }}>
      <Stack
        direction='row'
        sx={{ mt: '2rem' }}
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h5' component='h2'>
          All Tasks
        </Typography>
        <Button variant='contained' onClick={openCreateTaskModal}>
          Add New
        </Button>
      </Stack>
      <TaskList data={data!} />
      <CreateTask
        isCreateModalOpen={isCreateModalOpen}
        closeCreateTaskModal={closeCreateTaskModal}
      />
    </Container>
  );
};

export default AdminIndex;
