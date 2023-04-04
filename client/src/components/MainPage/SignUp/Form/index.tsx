import { SubmitHandler, useForm } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { UserRegisterType, CustomErrorType } from '../../../../types';
import { ValidationError } from '../../../Global';
import { FormFooter } from '../../FormFooter';
import { signUp } from '../../../../api';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserRegisterType>({
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  });
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      toast.info('Info: #Account created!');

      await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
      navigate('/');
    },
    onError: (data: AxiosError<CustomErrorType>) => {
      const message: string =
        data?.response?.data?.message ||
        'Something went wrong please try again later';
      toast.error(`Error #${message}`);
    }
  });

  const SubmitForm: SubmitHandler<UserRegisterType> = (data) => {
    const { name, email, password } = data;

    mutate({ name, email, password });
  };

  const emailErrorMessage = (): string => {
    if (errors.email?.type === 'required') {
      return 'Email is required';
    } else if (errors.email?.type === 'pattern') {
      return 'Enter valid Email';
    }

    return '';
  };

  return (
    <Stack
      component='form'
      onSubmit={handleSubmit(SubmitForm)}
      noValidate
      justifyContent='center'
      direction='column'
    >
      <TextField
        type='text'
        label='Name'
        fullWidth
        error={Boolean(errors.name)}
        {...register('name', {
          required: true
        })}
      />
      {errors.name?.type === 'required' && (
        <ValidationError text='Name is required' />
      )}

      <TextField
        type='email'
        label='Email'
        fullWidth
        error={Boolean(errors.email)}
        sx={{ mt: 2 }}
        {...register('email', {
          required: true,
          pattern: /^[\w.%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/
        })}
      />
      {errors.email && <ValidationError func={emailErrorMessage} />}

      <TextField
        type='password'
        label='Password'
        fullWidth
        error={Boolean(errors.password)}
        sx={{ mt: 2 }}
        {...register('password', { required: true })}
      />
      {errors.password?.type === 'required' && (
        <ValidationError text='Password is required' />
      )}

      <FormFooter
        isLoading={isLoading}
        btnTxt='Sign up'
        linkTxt='Login here'
        infoTxt='Already have an account?'
        linkUrl='/'
      />
    </Stack>
  );
};
