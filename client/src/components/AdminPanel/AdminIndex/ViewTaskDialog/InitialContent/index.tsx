import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Typography
} from '@mui/material';

import { InitialContentProps } from './index.types';

export const InitialContent = ({
  createdAt,
  desc,
  isCompleted,
  isLoading,
  title,
  userName
}: InitialContentProps) => {
  return (
    <div>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          maxHeight: '140px'
        }}
      >
        <DialogContentText>{desc}</DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          User:{' '}
          {isLoading ? (
            <Skeleton
              width='89px'
              sx={{ display: 'inline-block', marginBottom: '-.8rem' }}
              height='34px'
              animation='wave'
            />
          ) : (
            <Typography
              variant='body1'
              component='span'
              sx={{ display: 'inline' }}
            >
              {userName ?? 'Deleted User'}
            </Typography>
          )}{' '}
        </DialogContentText>
        <DialogContentText>
          Assigned at:{' '}
          {new Date(createdAt).toLocaleString('en-UK', {
            dateStyle: 'short'
          })}
        </DialogContentText>
        <DialogContentText>
          It is {isCompleted ? 'completed' : 'not done yet'}
        </DialogContentText>
      </DialogContent>
    </div>
  );
};
