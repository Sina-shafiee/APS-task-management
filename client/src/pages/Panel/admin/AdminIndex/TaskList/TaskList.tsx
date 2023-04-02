import { Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { getAllTasks } from '../../../../../api/tasks';
import TaskCard from '../TaskCard/TaskCard';

const TaskList = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllTasks,
    queryKey: ['all-tasks'],
    staleTime: Infinity
  });

  if (isLoading) {
    // todo render skeleton
    return <></>;
  }

  if (isError) {
    // todo render error el
    return <></>;
  }

  return (
    <Grid marginTop={4} marginBottom={4} spacing={2} container>
      {data?.map((task) => {
        return <TaskCard key={task._id} {...task} />;
      })}
    </Grid>
  );
};

export default TaskList;
