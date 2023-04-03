import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { updateTask } from '../../../../../api/tasks';
import { getAllUsers } from '../../../../../api/user';

import { Task } from '../../../../../types/task';

type EditFormProps = {
  setNotEditing(): void;
  closeModal(): void;
  userId: string;
  title: string;
  desc: string;
  _id: string;
};

const EditForm = ({
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
  } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      title: title,
      desc: desc,
      userId: userId
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
      userId: d.userId,
      taskId: _id
    });
  };

  useEffect(() => {
    register('desc', { required: true });
  }, [register]);

  const queryClient = useQueryClient();
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryFn: getAllUsers,
    staleTime: Infinity,
    cacheTime: Infinity,

    select: (data) => {
      return data.filter((user) => {
        if (user.role === 'user') {
          return { _id: user._id, name: user.name, email: user.email };
        }

        return false;
      });
    },
    queryKey: ['all-users']
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateTask,
    retry: 2,
    mutationKey: 'update-task',
    onSuccess: (res) => {
      const prevData = queryClient.getQueryData('all-tasks') as Task[];
      const updatedData = prevData.map((task) => {
        if (task._id === res.data._id) {
          task.createdAt = res.data.createdAt;
          task.desc = res.data.desc;
          task.title = res.data.title;
          task.isCompleted = res.data.isCompleted;
          task.userId = res.data.userId;
        }
        return task;
      });

      queryClient.setQueryData('all-tasks', updatedData);
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

export default EditForm;
