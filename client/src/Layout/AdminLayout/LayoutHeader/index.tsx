import { Link } from 'react-router-dom';
import {
  Tooltip,
  Avatar,
  AppBar,
  Toolbar,
  Stack,
  Box,
  Button
} from '@mui/material';
import { Menu } from '@mui/icons-material';

import { useProSidebar } from 'react-pro-sidebar';

const LayoutHeader = () => {
  const { toggleSidebar } = useProSidebar();

  return (
    <AppBar position='sticky'>
      <Toolbar disableGutters>
        <Stack
          direction='row'
          width='100%'
          maxWidth='lg'
          margin='0 auto'
          padding='0 1rem'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box
            onClick={() => {
              toggleSidebar();
            }}
          >
            <Menu
              sx={(theme) => ({
                fontSize: '2rem',
                mb: '-0.7rem',
                [theme.breakpoints.up(769)]: {
                  display: 'none'
                }
              })}
            />
          </Box>
          <Tooltip title='User profile'>
            <Button
              variant='text'
              component={Link}
              to='/admin/profile'
              sx={{
                p: 0,
                '&:hover': { backgroundColor: 'transparent !important' }
              }}
            >
              <Avatar
                alt=' Sharp'
                src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
              />
            </Button>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default LayoutHeader;
