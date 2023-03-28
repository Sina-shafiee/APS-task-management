import { Typography } from '@mui/material';

const NoTaskMessage = () => {
  return (
    <>
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
    </>
  );
};

export default NoTaskMessage;
