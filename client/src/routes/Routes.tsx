import { useRoutes } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import MainLayout from '../Layout/MainLayout';
import UserLayout from '../Layout/UserLayout';

import Login from '../pages/Main/Login/Login';
import SignUp from '../pages/Main/SignUp/SignUp';
import AdminIndex from '../pages/Panel/admin/AdminIndex/AdminIndex';
import People from '../pages/Panel/admin/People/People';
import UserIndex from '../pages/Panel/User/UserIndex/UserIndex';
import UserProfile from '../pages/Panel/User/UserProfile/UserProfile';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  const mainRoutes = [
    {
      element: <MainLayout />,
      path: '/',
      children: [
        { index: true, element: <Login /> },
        { path: 'sign-up', element: <SignUp /> }
      ]
    }
  ];
  const userRoutes = [
    {
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
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
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      path: '/admin/*',
      children: [
        { index: true, element: <AdminIndex /> },
        { path: 'people', element: <People /> }
      ]
    }
  ];
  return useRoutes([...mainRoutes, ...userRoutes, ...adminRoutes]);
};

export default Routes;
