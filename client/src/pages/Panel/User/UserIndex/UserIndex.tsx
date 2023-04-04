import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { getUserTasks } from '../../../../api';

import {
  TaskList,
  TasksSkeleton,
  NoTaskMessage
} from '../../../../components/UserPanel/UserIndex';

const UserIndex = () => {
  const {
    data,
    isLoading,
    error: taskError,
    isError,
    isFetching
  } = useQuery({
    queryFn: getUserTasks,
    queryKey: ['user-tasks'],
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });

  const error = taskError as AxiosError;

  return (
    <Container component='main' maxWidth='lg' sx={{ py: 4 }}>
      {isLoading ? (
        <TasksSkeleton />
      ) : isError && error?.response?.status === 404 ? (
        <NoTaskMessage />
      ) : data ? (
        <TaskList isFetching={isFetching} tasks={data} />
      ) : (
        <Typography align='center' variant='h4'>
          Something went wrong
        </Typography>
      )}
    </Container>
  );
};

export default UserIndex;
