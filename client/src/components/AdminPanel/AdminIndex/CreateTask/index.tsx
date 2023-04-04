import { useEffect } from 'react';

import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  Dialog
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { createTask, getAllUsers } from '../../../../api';

import { CreateTaskType, Task } from '../../../../types/task';
import { CreateTaskProps } from './index.types';
import { toast } from 'react-toastify';

export const CreateTask = ({
  closeCreateTaskModal,
  isCreateModalOpen
}: CreateTaskProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
    reset
  } = useForm<CreateTaskType>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      title: '',
      desc: '',
      userId: ''
    }
  });

  const descVal = watch('desc');

  const submitEditForm = (d: {
    title: string;
    desc: string;
    userId: string;
  }) => {
    mutate({
      title: d.title,
      desc: d.desc,
      userId: d.userId
    });
  };

  useEffect(() => {
    register('desc', { required: true });
  }, [register]);

  const queryClient = useQueryClient();
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryFn: getAllUsers,
    queryKey: ['all-users'],
    staleTime: Infinity,
    cacheTime: Infinity,

    select: (data) => {
      return data?.filter((user) => {
        if (user.role === 'user') {
          return { _id: user._id, name: user.name, email: user.email };
        }
        return false;
      });
    }
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: createTask,
    mutationKey: 'create-task',
    retry: 1,
    onSuccess: (data) => {
      const prevTasks = queryClient.getQueryData('all-tasks') as Task[];
      if (prevTasks) {
        const updatedTasks = [data, ...prevTasks];

        queryClient.setQueryData('all-tasks', updatedTasks);
        closeCreateTaskModal();
        toast.success('Task assigned');
        reset();
      }
    }
  });

  return (
    <Dialog
      open={isCreateModalOpen}
      onClose={closeCreateTaskModal}
      maxWidth='sm'
      fullWidth={true}
    >
      <Stack
        component='form'
        sx={{ padding: '1rem' }}
        onSubmit={handleSubmit(submitEditForm)}
        spacing={2}
      >
        <Typography variant='h6' component='h4'>
          Assign Task
        </Typography>

        <Controller
          name='userId'
          control={control}
          rules={{
            required: 'Please select a user'
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <>
                <Autocomplete
                  readOnly={isLoadingUsers}
                  ListboxProps={{
                    style: { maxHeight: '129px' }
                  }}
                  value={
                    value
                      ? users?.find((user) => {
                          return value === user._id;
                        }) ?? null
                      : null
                  }
                  getOptionLabel={(option) => {
                    return option.email;
                  }}
                  onChange={(event: any, newValue) => {
                    onChange(newValue ? newValue._id : null);
                  }}
                  id='controllable-states-demo'
                  options={users ?? []}
                  renderInput={(params) => (
                    <TextField {...params} label='Select user' inputRef={ref} />
                  )}
                />
                {error ? (
                  <span style={{ color: 'red' }}>{error.message}</span>
                ) : null}
              </>
            );
          }}
        />

        <TextField
          {...register('title', {
            required: true
          })}
          label='Title'
        />
        <ErrorMessage
          errors={errors}
          name='desc'
          render={() => (
            <Typography color='red' variant='body2'>
              Title is required
            </Typography>
          )}
        />

        <TextField
          multiline
          maxRows={5}
          value={descVal}
          onChange={(e) => {
            setValue('desc', e.target.value);
          }}
          label='Description'
        />
        <ErrorMessage
          errors={errors}
          name='desc'
          render={() => (
            <Typography color='red' variant='body2'>
              Description is required
            </Typography>
          )}
        />

        <Stack direction='row' justifyContent='flex-end'>
          <Button
            type='button'
            color='warning'
            disabled={isUpdating}
            onClick={closeCreateTaskModal}
            variant='contained'
          >
            Close
          </Button>
          <Button
            disabled={isUpdating}
            type='submit'
            sx={{ ml: '.4rem' }}
            variant='contained'
          >
            save
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
