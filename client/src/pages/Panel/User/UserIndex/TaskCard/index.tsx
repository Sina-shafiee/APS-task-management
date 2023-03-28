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
  isFetching: boolean;
};

const TaskCard = ({
  _id,
  desc,
  isCompleted,
  title,
  isFetching
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
          >
            {title.length > 15 ? title.slice(0, 15) + '..' : title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {desc.length > 30 ? desc.slice(0, 30) + '..' : desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={handleClickOpen}>
            View
          </Button>
          {open && (
            <TaskDialog
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
