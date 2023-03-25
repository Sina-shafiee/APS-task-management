import { Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';

export const UserIndex = () => {
  return (
    <Container component='main'>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        maxWidth='lg'
        sx={{ height: '80vh' }}
      >
        <Typography
          align='center'
          variant='h4'
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' } }}
        >
          Great News No new task!
        </Typography>
        <Typography align='center' variant='body1'>
          Send your account email to admins they will assign new tasks
        </Typography>
      </Stack>
    </Container>
  );
};
