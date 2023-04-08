import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { Button, Fab, Grid, Stack, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

import languages from '../../../../data/languages';
import skills from '../../../../data/skills';
import { User } from '../../../../types/user';

import { ValidationError } from '../../../Global';
import { FormProps } from './index.types';
import { EditUserFormDefaultsValues } from '../../../../types';

import { AutoComplete } from '../../../Global';
import { toast } from 'react-toastify';

export const Form = ({ mutate, mutationResult }: FormProps) => {
  const queryClient = useQueryClient();
  const [userPhoto, setUserPhoto] = useState('');

  const userData = queryClient.getQueryData<User>('current-user');

  const [defaultValues, setDefaultValues] =
    useState<EditUserFormDefaultsValues>({
      name: userData?.name ?? '',
      github: userData?.social?.github ?? '',
      linkedin: userData?.social?.linkedin ?? '',
      skills: userData?.skills ?? [],
      language: userData?.language ?? [],
      email: ''
    });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm<EditUserFormDefaultsValues>({
    mode: 'onBlur',
    defaultValues
  });

  useEffect(() => {
    if (mutationResult) {
      setDefaultValues({
        name: mutationResult.name,
        github: mutationResult.social.github,
        linkedin: mutationResult.social.linkedin,
        skills: mutationResult.skills,
        language: mutationResult.language,
        email: ''
      });
    }
  }, [mutationResult]);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateChange = () => {
    if (isUpdating) {
      reset(defaultValues);
      setIsUpdating(false);
      setUserPhoto('');
      return;
    }

    setIsUpdating(true);
  };

  const imageToBase64 = async (image: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

    setUserPhoto(data as string);
    toast.success('image loaded');
  };

  const updateUser: SubmitHandler<EditUserFormDefaultsValues> = async (
    data
  ) => {
    const { github, name, linkedin, language, skills } = data;
    if (github && name && linkedin && language && skills && userPhoto) {
      mutate({
        social: { github, linkedin },
        name,
        language,
        skills,
        image: userPhoto
      });
      setIsUpdating(false);
    }
  };

  return (
    <Stack
      onSubmit={handleSubmit(updateUser)}
      gap={2}
      maxWidth='md'
      direction='column'
      component='form'
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            disabled={!isUpdating}
            {...register('name', {
              required: true
            })}
            label='Your Name'
            autoComplete='given-name'
          />
          {errors?.name?.type === 'required' && (
            <ValidationError text='Name is required' />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            value={userData?.email}
            label='Your Email'
            autoComplete='email'
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled={!isUpdating}
            {...register('linkedin', {
              required: true,
              pattern:
                /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_.]+\/?$/i
            })}
            label='Linkedin address'
            autoComplete='given-name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isUpdating}
            fullWidth
            {...register('github', {
              required: true,
              pattern:
                /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-_.]+\/?$/i
            })}
            label='Github address'
            autoComplete='email'
          />
        </Grid>
      </Grid>

      <AutoComplete
        inputName='skills'
        options={skills}
        placeholder='Chose your skills'
        isUpdating={isUpdating}
        control={control}
      />

      <AutoComplete
        inputName='language'
        options={languages}
        placeholder='Chose your language'
        isUpdating={isUpdating}
        control={control}
      />
      <label htmlFor='upload-photo'>
        <input
          style={{ display: 'none' }}
          onChange={async (e) => {
            if (e.target?.files) {
              await imageToBase64(e.target.files[0]);
            }
          }}
          disabled={!isUpdating}
          accept='image/*'
          id='upload-photo'
          type='file'
        />
        <Fab
          color='secondary'
          size='small'
          disabled={!isUpdating}
          component='span'
          aria-label='add'
          variant='extended'
        >
          <Add /> Upload photo
        </Fab>
      </label>

      <Stack
        sx={{ mt: '1rem', flexDirection: 'row', alignItems: 'center', gap: 2 }}
      >
        <Button disabled={!isUpdating} type='submit' variant='contained'>
          Save
        </Button>
        <Button onClick={handleUpdateChange} type='button' variant='text'>
          {isUpdating ? 'cancel' : 'Edit'}
        </Button>
      </Stack>
    </Stack>
  );
};
