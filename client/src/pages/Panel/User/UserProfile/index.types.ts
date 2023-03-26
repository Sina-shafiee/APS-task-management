import { AxiosResponse } from 'axios';
import { Control } from 'react-hook-form';
import { UseMutateFunction } from 'react-query';
import { UpdateUser, User } from '../../../../types/user';

export type FormProps = {
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    UpdateUser,
    unknown
  >;
  mutationResult: User | undefined;
};

export type InputNames =
  | 'name'
  | 'github'
  | 'linkedin'
  | 'skills'
  | 'language'
  | `skills.${number}`
  | `language.${number}`;

export type DefaultsValues = {
  name: string | undefined;
  github: string | undefined;
  linkedin: string | undefined;
  skills: string[];
  language: string[];
};

export type AutoCompleteProps = {
  inputName: InputNames;
  placeholder: string;
  options: string[];
  isUpdating: boolean;
  control: Control<DefaultsValues>;
};
