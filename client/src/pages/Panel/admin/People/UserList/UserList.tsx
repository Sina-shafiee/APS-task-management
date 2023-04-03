import { Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { getAllUsers } from '../../../../../api/user';
import UserCard from '../UserCard/UserCard';

const UserList = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllUsers,
    queryKey: ['all-users'],
    staleTime: Infinity,
    cacheTime: Infinity
  });

  if (isLoading) {
    // todo create skeleton
    return <></>;
  }

  if (isError) {
    // todo create error el
    return <></>;
  }

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
