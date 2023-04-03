import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { FormFooter } from '../../components/FormFooter';
import { ValidationError } from '../../../../components';
import { UserLoginType } from '../../../../types';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { login } from '../../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { CustomErrorType } from '../../index.types';
import { baseApi } from '../../../../api';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

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

  const SubmitForm: SubmitHandler<FieldValues> = (data) => {
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

export default Form;
