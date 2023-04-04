import { Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ValidationError } from '../../../Global';
import { useNavigate } from 'react-router-dom';

import { FormFooter } from '../../index';

import { baseApi } from '../../../../api';
import { login } from '../../../../api/auth';

import { AxiosError } from 'axios';
import { UserLoginType, CustomErrorType } from '../../../../types';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginType>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: UserLoginType) => {
      return login(data);
    },
    onSuccess: async (res) => {
      const {
        message,
        access_token,
        user: { role }
      } = res.data;
      if (message === 'success') {
        baseApi.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        queryClient.invalidateQueries(['current-user']);
        if (role === 'user') {
          toast.success('Info: #Logged In as user!');
          return navigate('/user', { replace: true });
        }

        toast.success('Info: #Logged In as admin!');
        return navigate('/admin', { replace: true });
      }
    },
    onError: (data: AxiosError<CustomErrorType>) => {
      const message: string =
        data?.response?.data?.message ||
        'Something went wrong please try again later';
      toast.error(`Error #${message}`);
    }
  });

  const SubmitForm: SubmitHandler<UserLoginType> = (data) => {
    const { email, password } = data;
    mutate({ email, password });
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
        label='Email'
        error={Boolean(errors.email)}
        fullWidth
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
        btnTxt='Login'
        linkTxt='Create new account'
        infoTxt='New here?'
        linkUrl='/sign-up'
      />
    </Stack>
  );
};
