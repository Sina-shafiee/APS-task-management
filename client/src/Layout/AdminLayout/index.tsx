import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import LayoutSidebar from './LayoutSidebar';

const AdminLayout = () => {
  return (
    <Stack sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <LayoutSidebar />

      <Stack sx={{ marginLeft: 2, marginTop: 2 }}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
