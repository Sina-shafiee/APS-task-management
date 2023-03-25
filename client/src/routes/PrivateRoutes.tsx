import type { PropsWithChildren } from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';

import { useQuery } from 'react-query';
import { getCurrentUser } from '../api/auth';

const PrivateRoutes = ({ children }: PropsWithChildren) => {
  const {
    data: response,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 2
  });

  const location = useLocation();

  if (isLoading) {
    return (
      <Stack
        height='100vh'
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap='1rem'
      >
        <Typography variant='h6'>Verifying User..</Typography>
        <CircularProgress />
      </Stack>
    );
  }

  if (isError) {
    return <Navigate to='/' replace />;
  }

  if (response?.data.role === 'user' && location.pathname.includes('/admin')) {
    return <Navigate to='/user' replace />;
  }

  if (response?.data.role === 'admin' && location.pathname.includes('/user')) {
    return <Navigate to='/admin' replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
