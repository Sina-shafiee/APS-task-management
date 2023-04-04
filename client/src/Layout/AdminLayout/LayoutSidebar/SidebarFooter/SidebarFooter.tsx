import { DarkMode, LightMode, Logout } from '@mui/icons-material';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseApi } from '../../../../api';
import { logoutUser } from '../../../../api/auth';
import { useColors } from '../../../../hooks';

const SidebarFooter = () => {
  const { isDark, toggleTheme } = useColors();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      if (res?.data?.message === 'success') {
        queryClient.clear();
        baseApi.defaults.headers.common.Authorization = null;
        navigate('/');
        toast.success('logged out');
      }
    }
  });

  const handleLogOut = () => {
    mutate();
  };

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
      <MenuItem onClick={handleLogOut} icon={<Logout />}>
        Log out
      </MenuItem>
    </Menu>
  );
};

export default SidebarFooter;
