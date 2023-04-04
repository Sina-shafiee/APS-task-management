import { Grid } from '@mui/material';

import { TaskCard } from '../TaskCard';

import { TaskListProps } from './index.types';

export const TaskList = ({ data }: TaskListProps) => {
  return (
    <Grid marginTop={4} marginBottom={4} spacing={2} container>
      {data?.map((task) => {
        return <TaskCard key={task._id} {...task} />;
      })}
    </Grid>
  );
};
