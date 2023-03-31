import { Grid, Typography } from '@mui/material';
import { Task } from '../../../../../types/task';
import TaskCard from '../TaskCard';

export type TaskListProps = {
  tasks: Task[];
  isFetching: boolean;
};

const TaskList = ({ tasks, isFetching }: TaskListProps) => {
  return (
    <>
      <Typography variant='h5' marginTop={6} component='h2'>
        Assigned Tasks
      </Typography>
      <Grid marginTop={4} container spacing={2}>
        {tasks.map((task) => (
          <TaskCard
            createdAt={task.createdAt}
            userId={task.userId}
            key={task._id}
            _id={task._id}
            desc={task.desc}
            title={task.title}
            isFetching={isFetching}
            isCompleted={task.isCompleted}
          />
        ))}
      </Grid>
    </>
  );
};

export default TaskList;
