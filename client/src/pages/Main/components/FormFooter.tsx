import { Button, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export type FormFooterProps = {
  isLoading: boolean;
  btnTxt: string;
  infoTxt: string;
  linkTxt: string;
  linkUrl: string;
};

export const FormFooter = ({
  isLoading,
  btnTxt,
  infoTxt,
  linkTxt,
  linkUrl
}: FormFooterProps) => {
  return (
    <>
      <Button
        disabled={isLoading}
        type='submit'
        variant='contained'
        fullWidth
        sx={{ mt: 3 }}
      >
        {isLoading ? <CircularProgress size={24} /> : btnTxt}
      </Button>
      <Typography sx={{ mt: 2 }}>
        {infoTxt}{' '}
        <Typography component={Link} color='primary' to={linkUrl}>
          {linkTxt}
        </Typography>
      </Typography>
    </>
  );
};
