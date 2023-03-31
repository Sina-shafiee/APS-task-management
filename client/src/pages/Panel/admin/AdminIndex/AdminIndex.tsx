import { Button, Container, Stack, Typography } from '@mui/material';
import TaskList from './TaskList/TaskList';

const AdminIndex = () => {
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
        <Button variant='contained'>Add New</Button>
      </Stack>
      <TaskList />
    </Container>
  );
};

export default AdminIndex;
