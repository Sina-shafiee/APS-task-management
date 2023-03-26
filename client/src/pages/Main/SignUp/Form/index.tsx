import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

import { Stack, TextField } from '@mui/material';

import { signUp } from '../../../../api';

import { ValidationError } from '../../../../components';
import { FormFooter } from '../../components/FormFooter';

import { CustomErrorType } from '../../index.types';
import { UserRegisterType } from '../../../../types';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (data: UserRegisterType) => {
      return signUp(data);
    },
    {
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
    }
  );

  const SubmitForm: SubmitHandler<FieldValues> = (data) => {
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

export default Form;
