import type { PropsWithChildren } from 'react';
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
    staleTime: Infinity
  });

  const location = useLocation();

  if (isLoading) {
    // todo return loading component
    return <></>;
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
