import {
  HistoryTwoTone,
  PeopleOutlined,
  TaskAltOutlined
} from '@mui/icons-material';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useColors } from '../../../../hooks';

const SidebarContent = () => {
  const { isDark } = useColors();
  return (
    <Menu
      style={{ marginTop: '4rem' }}
      menuItemStyles={{
        button: {
          color: '#fefefe',
          '&:hover': isDark
            ? {
                backgroundColor: '#404040'
              }
            : {
                backgroundColor: '#757575'
              }
        }
      }}
    >
      <MenuItem component={<Link to='/admin' />} icon={<TaskAltOutlined />}>
        Manage tasks
      </MenuItem>
      <MenuItem
        component={<Link to='/admin/people' />}
        icon={<PeopleOutlined />}
      >
        Manage users
      </MenuItem>
      <MenuItem
        component={<Link to='/admin/history' />}
        icon={<HistoryTwoTone />}
      >
        View history
      </MenuItem>
    </Menu>
  );
};

export default SidebarContent;
