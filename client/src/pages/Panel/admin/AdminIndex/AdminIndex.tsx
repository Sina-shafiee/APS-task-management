import { Button, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CreateTask from './CreateTask/CreateTask';
import TaskList from './TaskList/TaskList';

const AdminIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      <TaskList />
      <CreateTask
        isCreateModalOpen={isCreateModalOpen}
        closeCreateTaskModal={closeCreateTaskModal}
      />
    </Container>
  );
};

export default AdminIndex;
