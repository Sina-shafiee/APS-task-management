import { DoneAll, RemoveDone } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Task } from '../../../../../types/task';
import ViewTaskDialog from '../ViewTaskDialog/ViewTaskDialog';

type TaskCardProps = Task;

const TaskCard = ({
  _id,
  desc,
  isCompleted,
  title,
  userId,
  createdAt
}: TaskCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={_id} position='relative'>
      <Card>
        <CardContent>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical'
            }}
            variant='h5'
            component='h4'
            color='text.secondary'
          >
            {title}
          </Typography>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical'
            }}
            color='text.secondary'
          >
            {desc}
          </Typography>
        </CardContent>
        <CardActions onClick={openModal}>
          <Button size='small'>View</Button>
        </CardActions>

        {modalOpen && (
          <ViewTaskDialog
            createdAt={createdAt}
            userId={userId}
            isCompleted={isCompleted}
            desc={desc}
            closeModal={closeModal}
            title={title}
            _id={_id}
          />
        )}

        {isCompleted ? (
          <DoneAll
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              color: 'success.main'
            }}
          />
        ) : (
          <RemoveDone
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              color: 'warning.main'
            }}
          />
        )}
      </Card>
    </Grid>
  );
};

export default TaskCard;
