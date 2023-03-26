import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { Button, Grid, Stack, TextField } from '@mui/material';

import languages from '../../../../../data/languages';
import skills from '../../../../../data/skills';
import { User } from '../../../../../types/user';

import AutoComplete from './AutoComplete';
import { ValidationError } from '../../../../../components';
import { DefaultsValues, FormProps } from '../index.types';

const Form = ({ mutate, mutationResult }: FormProps) => {
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<{ data: User }>(
    'current-user'
  )?.data;

  const [defaultValues, setDefaultValues] = useState<DefaultsValues>({
    name: userData?.name ?? '',
    github: userData?.social?.github ?? '',
    linkedin: userData?.social?.linkedin ?? '',
    skills: userData?.skills ?? [],
    language: userData?.language ?? []
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm<DefaultsValues>({
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
        language: mutationResult.language
      });
    }
  }, [mutationResult]);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateChange = () => {
    if (isUpdating) {
      reset(defaultValues);
      setIsUpdating(false);
      return;
    }

    setIsUpdating(true);
  };

  const updateUser: SubmitHandler<DefaultsValues> = (data) => {
    const { github, name, linkedin, language, skills } = data;

    if (github && name && linkedin && language && skills) {
      mutate({ social: { github, linkedin }, name, language, skills });
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
        control={control}
        isUpdating={isUpdating}
      />

      <AutoComplete
        inputName='language'
        options={languages}
        placeholder='Chose your language'
        control={control}
        isUpdating={isUpdating}
      />

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

export default Form;
