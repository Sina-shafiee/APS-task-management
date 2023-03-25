import { AppBar, Toolbar, Typography, Container } from '@mui/material';

import { Adb } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';

function Navbar() {
  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/user'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            TASKDO
          </Typography>

          <Adb sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>

          <NavbarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
