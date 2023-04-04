import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getUserTasks } from '../../../../api/task';
import NoTaskMessage from './NoTaskMessage';
import TasksSkeleton from './Skeleton';
import TaskList from './TaskList';

const UserIndex = () => {
  const { data, isLoading, error, isError, isFetching } = useQuery<
    any,
    AxiosError
  >({
    queryFn: getUserTasks,
    queryKey: ['user-tasks'],
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });

  return (
    <Container component='main' maxWidth='lg' sx={{ py: 4 }}>
      {isLoading ? (
        <TasksSkeleton />
      ) : isError && error?.response?.status === 404 ? (
        <NoTaskMessage />
      ) : data ? (
        <TaskList isFetching={isFetching} tasks={data?.data} />
      ) : (
        <Typography align='center' variant='h4'>
          Something went wrong
        </Typography>
      )}
    </Container>
  );
};

export default UserIndex;
