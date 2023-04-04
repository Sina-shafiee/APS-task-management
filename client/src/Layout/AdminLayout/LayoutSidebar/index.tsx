import { Box } from '@mui/material';
import { Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { useTheme } from '../../../hooks';

import SidebarContent from './SidebarContent/SidebarContent';
import SidebarFooter from './SidebarFooter/SidebarFooter';
import SidebarHeader from './SidebarHeader/SidebarHeader';

const LayoutSidebar = () => {
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 1210
      }}
    >
      <Sidebar
        breakPoint='md'
        style={{ height: '100vh', border: 'none' }}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            display: 'flex',
            flexDirection: 'column'
          }
        }}
        backgroundColor={isDark ? '#272727' : '#6b6b6b'}
      >
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
      </Sidebar>
    </Box>
  );
};

export default LayoutSidebar;
