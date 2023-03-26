import { Container, Grid, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { updateCurrentUser } from '../../../../api/user';

import Form from './Form';

import bg from '../../../../assets/profile-bg.svg';

export const UserProfile = () => {
  const queryClient = useQueryClient();
  const { mutate, data: response } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      toast.success('Profile updated');
    }
  });

  return (
    <Container maxWidth='lg' sx={{ px: 3 }} component='main'>
      <Grid
        container
        columnSpacing={4}
        sx={{
          mt: { xs: '1rem', md: '6rem' },
          mb: { xs: '2rem', sm: 0 }
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: 'grid',
            placeItems: { xs: 'start', md: 'center' },
            p: { xs: 4, sm: 8, md: 2 },
            overflow: 'hidden',
            borderRadius: '8px',
            backgroundImage: { xs: 'none', md: `url(${bg})` }
          }}
        >
          <Typography
            variant='h5'
            sx={{
              textAlign: { xs: 'start', md: 'center' },
              fontSize: { xs: '2rem', md: '2rem', lg: '2.8rem' },
              mt: -4
            }}
            component='h1'
          >
            Update Your Profile
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Form mutationResult={response?.data?.user} mutate={mutate} />
        </Grid>
      </Grid>
    </Container>
  );
};
