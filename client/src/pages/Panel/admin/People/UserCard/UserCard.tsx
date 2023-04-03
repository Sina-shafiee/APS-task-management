import { AccessTime, Email, Person } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Button,
  CardActions
} from '@mui/material';
import { useState } from 'react';
import { User } from '../../../../../types/user';
import ViewUserDialog from '../ViewUserDialog/ViewUserDialog';

type UserCardProps = User;

const UserCard = ({
  name,
  email,
  _id,
  createdAt,
  language,
  role,
  skills,
  social,
  updatedAt
}: UserCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} key={_id} position='relative'>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: '1rem', fontWeight: 900 }}>
            Basic info
          </Typography>
          <Stack gap={2} sx={{ py: 0.4 }} direction='row' alignItems='center'>
            <Person />
            <Typography>{name}</Typography>
          </Stack>

          <Stack gap={2} sx={{ py: 0.4 }} direction='row' alignItems='center'>
            <Email />
            <Typography>{email}</Typography>
          </Stack>

          <Stack gap={2} sx={{ py: 0.4 }} direction='row' alignItems='center'>
            <AccessTime />
            <Typography>
              {new Date(createdAt).toLocaleString('en-Uk', {
                dateStyle: 'short'
              })}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button variant='text' onClick={openModal}>
            View
          </Button>
        </CardActions>
        <Button
          sx={{
            borderRadius: 2,
            py: 0.1,
            px: 0.2,
            position: 'absolute',
            top: 5,
            right: -8,
            cursor: 'auto'
          }}
          color={role.includes('admin') ? 'warning' : 'primary'}
          variant='contained'
          disableRipple
        >
          {role}
        </Button>
      </Card>
      <ViewUserDialog
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        name={name}
        email={email}
        role={role}
        _id={_id}
        createdAt={createdAt}
        language={language}
        skills={skills}
        social={social}
        updatedAt={updatedAt}
      />
    </Grid>
  );
};

export default UserCard;
