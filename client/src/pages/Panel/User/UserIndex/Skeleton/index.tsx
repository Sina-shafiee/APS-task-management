import { Grid, Skeleton } from '@mui/material';
import { Container } from '@mui/system';

const TasksSkeleton = () => {
  return (
    <Container maxWidth='lg' sx={{ marginTop: 6 }}>
      <Skeleton width='170px' height='60px' animation='wave' />
      <Grid spacing={2} container marginTop={-2} height='250px'>
        {new Array(4).fill(0).map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Skeleton width='100%' height='100%' animation='wave' />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TasksSkeleton;
