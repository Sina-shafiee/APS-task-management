import { useRoutes } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import MainLayout from '../Layout/MainLayout';
import UserLayout from '../Layout/UserLayout';

import Login from '../pages/Main/Login';
import SignUp from '../pages/Main/SignUp';

import AdminIndex from '../pages/Panel/Admin/AdminIndex';
import ManagePeople from '../pages/Panel/Admin/ManagePeople';

import UserIndex from '../pages/Panel/User/UserIndex/UserIndex';
import UserProfile from '../pages/Panel/User/UserProfile/UserProfile';

import AuthWrapper from './AuthWrapper';

const Routes = () => {
  const mainRoutes = [
    {
      element: (
        <AuthWrapper>
          <MainLayout />
        </AuthWrapper>
      ),
      children: [
        { path: '/', element: <Login /> },
        { path: '/sign-up', element: <SignUp /> }
      ]
    }
  ];
  const userRoutes = [
    {
      element: (
        <AuthWrapper>
          <UserLayout />
        </AuthWrapper>
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
        <AuthWrapper>
          <AdminLayout />
        </AuthWrapper>
      ),
      path: '/admin/*',
      children: [
        { index: true, element: <AdminIndex /> },
        { path: 'people', element: <ManagePeople /> }
      ]
    }
  ];
  return useRoutes([...mainRoutes, ...userRoutes, ...adminRoutes]);
};

export default Routes;
