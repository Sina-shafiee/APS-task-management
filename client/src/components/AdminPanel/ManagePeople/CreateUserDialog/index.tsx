import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { User } from '../../../../types/user';
import { CreateUserFormValues, CustomErrorType } from '../../../../types';
import { CreateUserDialogProps } from './index.types';
import { createUser } from '../../../../api/user';
import { AxiosError } from 'axios';

export const CreateUserDialog = ({
  closeModal,
  isModalOpen
}: CreateUserDialogProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<CreateUserFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    retry: 1,
    onSuccess(data) {
      const prevData = JSON.parse(
        JSON.stringify(queryClient.getQueryData('all-users'))
      ) as User[];

      const updatedData = [data, ...prevData];
      queryClient.setQueryData('all-users', updatedData);
      toast.success('User created');
      closeModal();
      reset();
    },
    onError: (error: AxiosError<CustomErrorType>) => {
      const errorMessage =
        error?.response?.data?.message || 'something went wrong';
      toast.error(errorMessage);
    }
  });

  const editUser: SubmitHandler<CreateUserFormValues> = (data) => {
    const { name, email, password } = data;
    mutate({
      name,
      email,
      password
    });
  };

  return (
    <Dialog fullWidth maxWidth='sm' open={isModalOpen} onClose={closeModal}>
      <DialogContent
        sx={{
          '::-webkit-scrollbar': {
            width: '5px'
          },

          '::-webkit-scrollbar-track': {
            background: '#f1f1f1'
          },

          '::-webkit-scrollbar-thumb ': {
            background: ' #888'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }}
      >
        <DialogTitle>Create new user</DialogTitle>
        <Stack
          component='form'
          sx={{ px: 1, py: 4 }}
          gap={2}
          onSubmit={handleSubmit(editUser)}
        >
          <TextField
            disabled={isLoading}
            {...register('name', { required: true })}
            label='User name'
          />

          {errors?.name?.type === 'required' && (
            <Typography sx={{ color: 'warning.main' }}>
              name is required
            </Typography>
          )}

          <TextField
            disabled={isLoading}
            {...register('email', {
              required: true,
              pattern: /^[\w.%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/
            })}
            label='User email'
          />

          {errors?.email?.type === 'required' && (
            <Typography sx={{ color: 'warning.main' }}>
              email is required
            </Typography>
          )}
          {errors?.email?.type === 'pattern' && (
            <Typography sx={{ color: 'warning.main' }}>
              please provide valid email
            </Typography>
          )}

          <TextField
            disabled={isLoading}
            {...register('password', {
              required: true,
              minLength: 8
            })}
            type='password'
            label='User password'
          />

          <Box
            component='button'
            type='submit'
            disabled={isLoading}
            id='Submit-edit-user-form'
            sx={{ display: { xl: 'none', xs: 'none' } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack direction='row' gap={1}>
          <Button variant='contained' disabled={isLoading}>
            <Box
              sx={{
                cursor: 'pointer',
                width: '100%'
              }}
              component='label'
              htmlFor='Submit-edit-user-form'
            >
              Save
            </Box>
          </Button>
        </Stack>
        <Button
          onClick={closeModal}
          disabled={isLoading}
          variant='text'
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <Close />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
