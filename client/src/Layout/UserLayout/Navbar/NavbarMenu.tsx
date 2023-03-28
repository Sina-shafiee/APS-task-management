import { MouseEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  IconButton,
  Tooltip,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@mui/material';
import { StyledThemeToggle } from '../../../components';

import { useColors } from '../../../hooks';
import { logoutUser } from '../../../api/auth';
import { useMutation, useQueryClient } from 'react-query';

const NavbarMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isDark, toggleTheme } = useColors();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      if (res.data.message === 'success') {
        queryClient.clear();
        navigate('/');
        toast.success('logged out');
      }
    }
  });

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handelLogout = () => {
    mutate();
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ ml: 'auto' }}>
      <Tooltip title='menu'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt=' Sharp'
            src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px', width: '350px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem sx={{ p: 0 }} onClick={handleCloseUserMenu}>
          <Typography
            sx={{
              py: 1,
              px: 1.5,
              textDecoration: 'none',
              color: 'inherit',
              width: '100%'
            }}
            component={Link}
            to='/user/profile'
          >
            User Profile
          </Typography>
        </MenuItem>

        <Divider sx={{ width: '90%', mx: 'auto' }} />

        <MenuItem
          sx={{ width: '180px', py: 1, px: 1.5 }}
          onClick={handelLogout}
        >
          <Typography>Log out</Typography>
        </MenuItem>

        <Divider sx={{ width: '90%', mx: 'auto' }} />

        <MenuItem sx={{ pl: 1, mt: 0.3 }}>
          <StyledThemeToggle
            checked={isDark}
            onChange={toggleTheme}
            inputProps={{ 'aria-label': 'toggle theme' }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavbarMenu;
