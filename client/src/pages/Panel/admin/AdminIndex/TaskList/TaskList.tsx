import { Grid } from '@mui/material';
import { Task } from '../../../../../types/task';
import TaskCard from '../TaskCard/TaskCard';

export type TaskListProps = {
  data: Task[];
};

const TaskList = ({ data }: TaskListProps) => {
  return (
    <Grid marginTop={4} marginBottom={4} spacing={2} container>
      {data?.map((task) => {
        return <TaskCard key={task._id} {...task} />;
      })}
    </Grid>
  );
};

export default TaskList;
