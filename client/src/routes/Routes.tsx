import { useRoutes } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import UserLayout from '../Layout/UserLayout';

import { Login, SignUp } from '../pages/Main';
import { UserIndex, UserProfile } from '../pages/Panel/User';
import PrivateRoutes from './PrivateRoutes';

const Routes = () => {
  const mainRoutes = [
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: '/sign-up', element: <SignUp /> }
      ]
    }
  ];
  const userRoutes = [
    {
      element: (
        <PrivateRoutes>
          <UserLayout />
        </PrivateRoutes>
      ),
      path: '/user/*',
      children: [
        { index: true, element: <UserIndex /> },
        { path: 'profile', element: <UserProfile /> }
      ]
    }
  ];
  const adminRoutes = [
    {
      element: (
        <PrivateRoutes>
          <UserLayout />
        </PrivateRoutes>
      ),
      path: '/admin/*',
      children: [
        { index: true, element: <UserIndex /> },
        { path: 'login', element: <Login /> }
      ]
    }
  ];
  return useRoutes([...mainRoutes, ...userRoutes, ...adminRoutes]);
};

export default Routes;
