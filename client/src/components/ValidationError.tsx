import { Typography } from '@mui/material';

export type ValidationErrorProps = {
  text?: string;
  func?: () => string;
};

export const ValidationError = ({ text, func }: ValidationErrorProps) => {
  return (
    <Typography sx={{ mt: 1 }} color='red' variant='caption'>
      {text || func!()}
    </Typography>
  );
};
