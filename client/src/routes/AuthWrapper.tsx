import type { PropsWithChildren } from 'react';
import { LinearProgress } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getCurrentUser } from '../api/auth';

const AuthWrapper = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    onError: () => {
      console.clear();
    },
    onSuccess: () => {
      console.clear();
    }
  });

  const location = useLocation();

  if (isLoading) {
    return <LinearProgress />;
  }
  if (
    isError &&
    (location?.pathname === '/' || location.pathname === '/sign-up')
  ) {
    return <>{children}</>;
  }
  if (isError) {
    return <Navigate to='/' replace />;
  }

  if (data?.role === 'user' && location.pathname.includes('/admin')) {
    return <Navigate to='/user' replace />;
  }

  if (data?.role === 'admin' && location.pathname.includes('/user')) {
    return <Navigate to='/admin' replace />;
  }

  if (data && (location.pathname === '/' || location.pathname === '/sign-up')) {
    return <Navigate to='/user' replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
