import { Card, Grid, Skeleton, Stack } from '@mui/material';

export const TasksSkeleton = () => {
  return (
    <Stack maxWidth='lg' sx={{ marginTop: 6, p: 0 }}>
      <Skeleton width='170px' height='50px' animation='wave' />
      <Grid rowSpacing={4} columnSpacing={2} container marginTop={4}>
        {new Array(4).fill(0).map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ p: 2 }}>
              <Skeleton width='150px' height='40px' animation='wave' />
              <Skeleton width='100%' height='30px' animation='wave' />
              <Skeleton
                sx={{ mt: 2 }}
                width='60px'
                height='30px'
                animation='wave'
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
