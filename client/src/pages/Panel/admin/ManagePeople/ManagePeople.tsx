import { useCallback } from 'react';
import { useQuery } from 'react-query';
import {
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';

import { FetchError } from '../../../../components/Global';
import { getAllUsers } from '../../../../api';

import {
  CreateUserDialog,
  UserList
} from '../../../../components/AdminPanel/ManagePeople';
import { useState } from 'react';

const People = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const openCreateUserModal = useCallback(() => {
    setIsCreateUserModalOpen(true);
  }, []);

  const closeCreateUserModal = useCallback(() => {
    setIsCreateUserModalOpen(false);
  }, []);

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
        <Button variant='contained' onClick={openCreateUserModal}>
          Add new
        </Button>
      </Stack>
      {data && <UserList data={data} />}
      <CreateUserDialog
        isModalOpen={isCreateUserModalOpen}
        closeModal={closeCreateUserModal}
      />
    </Container>
  );
};

export default People;
