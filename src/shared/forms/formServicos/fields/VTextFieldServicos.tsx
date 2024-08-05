import { TextField } from '@mui/material';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface IVFormProps {
  name: string,
  description: string
}

interface VTextFieldProps {
  name: keyof IVFormProps;
  control: Control<IVFormProps>;
  errors: FieldErrors<IVFormProps>;
  label: string;
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  rules?: any;
  editing?: boolean 
}

/*eslint-disable react/prop-types*/

export const VTextFieldServicos: React.FC<VTextFieldProps> = ({ name, control, errors, label, rules, editing=false }) => {
  const error = errors[name];
  
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={editing}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin="normal"
          size="small"
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{ shrink: !!field.value }}
        />
      )}
    />
  );
};
