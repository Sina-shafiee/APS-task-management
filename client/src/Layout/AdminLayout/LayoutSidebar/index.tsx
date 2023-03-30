import { Box } from '@mui/material';
import { Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { useColors } from '../../../hooks';

import SidebarContent from './SidebarContent/SidebarContent';
import SidebarFooter from './SidebarFooter/SidebarFooter';
import SidebarHeader from './SidebarHeader/SidebarHeader';

const LayoutSidebar = () => {
  const { isDark } = useColors();

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0
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
        backgroundColor={isDark ? '#323232' : '#0022ac'}
      >
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
      </Sidebar>
    </Box>
  );
};

export default LayoutSidebar;
