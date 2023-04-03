import { useState } from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@mui/material';

import { DoneAll, RemoveDone } from '@mui/icons-material';
import TaskDialog from '../TaskDialog';

export type TaskCardProps = {
  _id: string;
  title: string;
  desc: string;
  isCompleted: boolean;
  userId: string;
  isFetching: boolean;
  createdAt: string;
};

const TaskCard = ({
  _id,
  desc,
  isCompleted,
  title,
  isFetching,
  userId,
  createdAt
}: TaskCardProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ position: 'relative' }}>
      <Card>
        <CardContent>
          <Typography
            variant='h5'
            component='h4'
            color='text.secondary'
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              textTransform: 'capitalize'
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              textTransform: 'lowercase'
            }}
            color='text.secondary'
          >
            {desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={handleClickOpen}>
            View
          </Button>
          {open && (
            <TaskDialog
              createdAt={createdAt}
              userId={userId}
              _id={_id}
              title={title}
              desc={desc}
              isFetching={isFetching}
              isCompleted={isCompleted}
              handleClose={handleClose}
            />
          )}
        </CardActions>

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
