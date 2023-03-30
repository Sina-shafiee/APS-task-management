import { Close, Menu } from '@mui/icons-material';
import { Stack, Typography, Box } from '@mui/material';
import { useProSidebar } from 'react-pro-sidebar';

const SidebarHeader = () => {
  const { collapsed, collapseSidebar } = useProSidebar();
  return (
    <Stack sx={{ px: '28px', mt: '1rem', color: '#fefefe' }}>
      {!collapsed ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            mb: 1.1
          }}
        >
          <Typography variant='h6'>TASKDO</Typography>
          <Box
            onClick={() => {
              collapseSidebar();
            }}
          >
            <Close sx={{ fontSize: '1.7rem', cursor: 'pointer' }} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ display: 'grid', placeContent: 'center', cursor: 'pointer' }}
          onClick={() => {
            collapseSidebar();
          }}
        >
          <Menu sx={{ fontSize: '2.7rem' }} />
        </Box>
      )}
    </Stack>
  );
};

export default SidebarHeader;
