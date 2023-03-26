import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AutoCompleteProps } from '../index.types';

const AutoComplete = ({
  isUpdating,
  control,
  inputName,
  options,
  placeholder
}: AutoCompleteProps) => {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field }) => {
        const value = Array.isArray(field.value) ? field.value : [field.value];

        return (
          <Autocomplete
            {...field}
            readOnly={!isUpdating}
            multiple
            options={options.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={inputName}
                placeholder={placeholder}
              />
            )}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            value={value}
          />
        );
      }}
    />
  );
};

export default AutoComplete;
