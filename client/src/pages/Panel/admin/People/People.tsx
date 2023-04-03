import { Button, Container, Stack, Typography } from '@mui/material';
import UserList from './UserList/UserList';

const People = () => {
  return (
    <Container maxWidth='lg' sx={{ p: '1rem' }}>
      <Stack
        sx={{ mt: '2rem' }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h5' component='h2'>
          All Users
        </Typography>
        <Button variant='contained'>Add new </Button>
      </Stack>
      <UserList />
    </Container>
  );
};

export default People;
