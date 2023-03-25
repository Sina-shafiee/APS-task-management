import { useContext } from 'react';
import { authContext } from '../context';

export const useAuth = () => {
  const context = useContext(authContext);

  return context;
};
