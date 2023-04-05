import {
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';

import { useQuery } from 'react-query';

import { FetchError } from '../../../../components/Global';
import { getAllUsers } from '../../../../api';

import { UserList } from '../../../../components/AdminPanel/ManagePeople/UserList';

const People = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllUsers,
    queryKey: ['all-users'],
    staleTime: Infinity,
    cacheTime: Infinity
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <FetchError />;
  }

  return (
    <Container maxWidth='lg' sx={{ p: '1rem' }}>
      <Stack
        sx={{ mt: '2rem' }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h5' component='h2'>
          All Users
        </Typography>
        <Button variant='contained'>Add new </Button>
      </Stack>
      <UserList data={data!} />
    </Container>
  );
};

export default People;
