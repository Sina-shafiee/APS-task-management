import { Outlet } from 'react-router-dom';

import { Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import { useTheme } from '../../hooks';

const MainLayout = () => {
  const { toggleTheme, isDark } = useTheme();
  return (
    <>
      <Button
        variant='text'
        disableRipple
        sx={{
          position: 'fixed',
          fontSize: '2rem',
          top: '2rem',
          right: { xs: 0, md: '2rem' },
          '&:hover': { bgcolor: 'transparent' }
        }}
        onClick={toggleTheme}
      >
        {isDark ? (
          <Brightness7 fontSize='inherit' />
        ) : (
          <Brightness4 fontSize='inherit' />
        )}
      </Button>
      <Outlet />
    </>
  );
};

export default MainLayout;
