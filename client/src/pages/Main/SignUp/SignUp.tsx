import { Container, Typography } from '@mui/material';
import Form from './Form';

const SignUp = () => {
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
        CREATE NEW ACCOUNT
      </Typography>
      <Form />
    </Container>
  );
};

export default SignUp;
