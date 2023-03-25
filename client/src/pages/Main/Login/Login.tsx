import { Container, Typography } from '@mui/material';
import Form from './Form';

export const Login = () => {
  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center'
      }}
    >
      <Typography variant='h5' sx={{ mb: 5 }} component='h1'>
        WELCOME TO TASKDO
      </Typography>
      <Form />
    </Container>
  );
};
