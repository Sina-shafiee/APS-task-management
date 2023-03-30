import { DarkMode, LightMode, Logout } from '@mui/icons-material';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { useColors } from '../../../../hooks';

const SidebarFooter = () => {
  const { isDark, toggleTheme } = useColors();
  return (
    <Menu
      style={{ marginTop: 'auto', margin: 'auto 0 2rem 0' }}
      menuItemStyles={{
        button: {
          color: '#fefefe',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }}
    >
      <MenuItem
        onClick={toggleTheme}
        icon={isDark ? <DarkMode /> : <LightMode />}
      >
        Theme
      </MenuItem>
      <MenuItem icon={<Logout />}>Log out</MenuItem>
    </Menu>
  );
};

export default SidebarFooter;
