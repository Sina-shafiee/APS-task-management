import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import languages from '../../../../../data/languages';
import allSkills from '../../../../../data/skills';
import { updateUser } from '../../../../../api';

import { EditUserFormDefaultsValues } from '../../../../../types';
import { User } from '../../../../../types/user';
import { EditFormProps } from './index.types';

export const EditForm = ({
  closeModal,
  setNotEditing,
  name,
  email,
  language,
  skills,
  social,
  _id
}: EditFormProps) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<EditUserFormDefaultsValues>({
    defaultValues: {
      name,
      email,
      language,
      skills,
      linkedin: social?.linkedin ?? '',
      github: social?.github ?? ''
    }
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: updateUser,
    retry: 1,
    onSuccess(data) {
      const prevData = queryClient.getQueryData('all-users') as User[];
      const updatedData = prevData?.map((user) => {
        if (user._id === data._id) {
          user.name = data.name;
          user.email = data.email;
          user.language = data.language;
          user.skills = data.skills;
          user.social = data.social;
        }

        return user;
      });
      queryClient.setQueryData('all-users', updatedData);

      toast.success('User updated');
      setNotEditing();
    }
  });

  const editUser: SubmitHandler<EditUserFormDefaultsValues> = (data) => {
    const { linkedin, github, name, email, language, skills } = data;
    mutate({
      name,
      email,
      language,
      skills,
      social: { linkedin, github },
      userId: _id
    });
  };

  return (
    <>
      <DialogContent>
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
            {...register('linkedin', {
              required: true,
              pattern:
                /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_.]+\/?$/i
            })}
            label='Linkedin address'
          />

          {errors?.linkedin?.type === 'required' && (
            <Typography sx={{ color: 'warning.main' }}>
              linkedin profile link is required
            </Typography>
          )}
          {errors?.linkedin?.type === 'pattern' && (
            <Typography sx={{ color: 'warning.main' }}>
              Please provide a valid link
            </Typography>
          )}

          <TextField
            disabled={isLoading}
            {...register('github', {
              required: true,
              pattern:
                /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-_.]+\/?$/i
            })}
            label='Github address'
          />
          {errors?.github?.type === 'required' && (
            <Typography sx={{ color: 'warning.main' }}>
              github profile link is required
            </Typography>
          )}
          {errors?.github?.type === 'pattern' && (
            <Typography sx={{ color: 'warning.main' }}>
              Please provide a valid link
            </Typography>
          )}

          <Controller
            name='skills'
            rules={{ required: true }}
            control={control}
            render={({ field }) => {
              const value = Array.isArray(field.value)
                ? field.value
                : [field.value];

              return (
                <Autocomplete
                  {...field}
                  readOnly={isLoading}
                  multiple
                  options={allSkills.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Skills'
                      placeholder='Select skills'
                    />
                  )}
                  onChange={(_, newValue: string[]) => {
                    field.onChange(newValue);
                  }}
                  value={value}
                />
              );
            }}
          />
          {errors?.skills?.type === 'required' && (
            <Typography sx={{ color: 'warning.main' }}>
              At least 1 Skill is required
            </Typography>
          )}

          <Controller
            name='language'
            rules={{ required: true }}
            control={control}
            render={({ field }) => {
              const value = Array.isArray(field.value)
                ? field.value
                : [field.value];

              return (
                <Autocomplete
                  readOnly={isLoading}
                  {...field}
                  multiple
                  options={languages.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Languages'
                      placeholder='Select languages'
                    />
                  )}
                  onChange={(_, newValue: string[]) => {
                    field.onChange(newValue);
                  }}
                  value={value}
                />
              );
            }}
          />

          {errors?.language?.type === 'required' && (
            <Typography sx={{ color: 'warning.main' }}>
              At least 1 Language is required
            </Typography>
          )}

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
          <Button variant='contained' onClick={setNotEditing} color='warning'>
            Cancel
          </Button>
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
    </>
  );
};
