import { Adb, Close, Menu as MenuIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

const SidebarHeader = () => {
  const { collapseSidebar, collapsed, broken, toggleSidebar } = useProSidebar();
  return (
    <Menu
      menuItemStyles={{
        button: {
          color: '#fefefe',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }}
      style={{ marginTop: '1rem', color: '#fefefe' }}
    >
      <MenuItem
        style={{ cursor: 'auto' }}
        suffix={
          <Close
            style={{ cursor: 'pointer' }}
            onClick={() => {
              broken ? toggleSidebar() : collapseSidebar();
            }}
          />
        }
        icon={
          collapsed ? (
            <MenuIcon
              onClick={() => {
                collapseSidebar();
              }}
              sx={{ fontSize: '2rem', cursor: 'pointer' }}
            />
          ) : (
            <Adb />
          )
        }
      >
        <Typography
          sx={{
            mr: 2,
            display: 'flex',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '0.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          TASKDO
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default SidebarHeader;
