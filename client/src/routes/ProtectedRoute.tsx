import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useQuery } from 'react-query';
import { getCurrentUser } from '../api/auth';
import { CircularProgress, Stack } from '@mui/material';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const {
    data: response,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
    onError: () => {
      console.clear();
    },
    onSuccess: () => {
      console.clear();
    }
  });

  const location = useLocation();

  if (isLoading) {
    return (
      <Stack
        direction='row'
        gap={1}
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '90vh' }}
      >
        <CircularProgress size={40} />
      </Stack>
    );
  }

  if (isError) {
    return <Navigate to='/' replace />;
  }

  if (response?.data?.role === 'user' && location.pathname.includes('/admin')) {
    return <Navigate to='/user' replace />;
  }

  if (response?.data?.role === 'admin' && location.pathname.includes('/user')) {
    return <Navigate to='/admin' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
