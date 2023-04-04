import { Control } from 'react-hook-form';
import { EditUserFormDefaultsValues } from '../../../types';

export type AutoCompleteProps = {
  placeholder: string;
  options: string[];
  inputName: string;
  isUpdating: boolean;
  control: Control<EditUserFormDefaultsValues, any>;
};
