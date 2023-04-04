import { Stack, Typography } from '@mui/material';
import { FetchErrorProps } from './index.types';

export const FetchError = ({ message, height = 60 }: FetchErrorProps) => {
  return (
    <Stack
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: `${height}vh` }}
    >
      <Typography>Something went wrong please try again</Typography>
      {message && <Typography>{message}</Typography>}
    </Stack>
  );
};
