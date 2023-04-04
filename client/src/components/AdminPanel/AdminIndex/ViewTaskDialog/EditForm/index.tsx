import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  Box
} from '@mui/material';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { updateTask, getAllUsers } from '../../../../../api';

import { Task, UpdateTaskType } from '../../../../../types/task';
import { EditFormProps } from './index.types';

export const EditForm = ({
  _id,
  setNotEditing,
  closeModal,
  userId,
  title,
  desc
}: EditFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control
  } = useForm<UpdateTaskType>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      title: title,
      desc: desc,
      userId: userId
    }
  });

  const descVal = watch('desc');

  const submitEditForm: SubmitHandler<UpdateTaskType> = (data) => {
    mutate({
      title: data.title,
      desc: data.desc,
      userId: data.userId,
      taskId: _id
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
      return data.filter((user) => {
        if (user.role === 'user') {
          return { _id: user._id, name: user.name, email: user.email };
        }

        return false;
      });
    }
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateTask,
    retry: 1,
    mutationKey: 'update-task',
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData('all-tasks') as Task[];
      const updatedData = prevData.map((task) => {
        if (task._id === data._id) {
          task.createdAt = data.createdAt;
          task.desc = data.desc;
          task.title = data.title;
          task.isCompleted = data.isCompleted;
          task.userId = data.userId;
        }
        return task;
      });

      queryClient.setQueryData('all-tasks', updatedData);
      toast.success('Task updated');
      setNotEditing();
    }
  });

  return (
    <Stack
      component='form'
      sx={{ padding: '1rem' }}
      onSubmit={handleSubmit(submitEditForm)}
      spacing={2}
    >
      <Typography variant='h6' component='h4'>
        Edit Task
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
                readOnly={isLoadingUsers || isUpdating}
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
        disabled={isUpdating}
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
        disabled={isUpdating}
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

      <Stack direction='row' justifyContent='space-between'>
        <Button type='button' autoFocus onClick={closeModal}>
          Close
        </Button>
        <Box>
          <Button
            type='button'
            color='warning'
            disabled={isUpdating}
            onClick={setNotEditing}
            variant='contained'
          >
            Cancel
          </Button>
          <Button
            disabled={isUpdating}
            type='submit'
            sx={{ ml: '.4rem' }}
            variant='contained'
          >
            save
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
