import { AppBar, Toolbar, Typography, Container } from '@mui/material';

import { Adb } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';

function Navbar() {
  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Adb sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/user'
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

          <NavbarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
