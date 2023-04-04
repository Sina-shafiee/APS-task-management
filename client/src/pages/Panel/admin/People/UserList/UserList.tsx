import { Grid } from '@mui/material';
import UserCard from '../UserCard/UserCard';
import { UserListProps } from './index.types';

const UserList = ({ data }: UserListProps) => {
  return (
    <Grid
      marginTop={4}
      marginBottom={4}
      spacing={2}
      container
      alignItems='stretch'
    >
      {data?.map((user) => {
        return <UserCard key={user._id} {...user} />;
      })}
    </Grid>
  );
};

export default UserList;
