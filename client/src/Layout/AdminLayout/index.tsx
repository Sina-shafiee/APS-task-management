import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';
import LayoutSidebar from './LayoutSidebar';

const AdminLayout = () => {
  return (
    <Stack sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <LayoutSidebar />

      <Stack sx={{ flex: 1 }}>
        <LayoutHeader />
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
