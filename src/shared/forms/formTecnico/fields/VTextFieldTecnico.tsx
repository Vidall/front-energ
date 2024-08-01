import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Icon } from '@mui/material';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { IUpdateTecnico } from '../../../Service/api/models/Tecnico';

interface VTextFieldProps {
  name: keyof IUpdateTecnico;
  control: Control<IUpdateTecnico>;
  errors: FieldErrors<IUpdateTecnico>;
  label: string;
  rules?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  tipo?: 'text' | 'email' | 'password' | 'submit';
}

export const VTextFieldTecnico: React.FC<VTextFieldProps> = ({ name, control, errors, label, rules, tipo }) => {
  const error = errors[name];
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={tipo === 'password' ? (showPassword ? 'text' : 'password') : tipo}
          fullWidth
          margin="normal"
          size="small"
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{ shrink: !!field.value }}
          InputProps={{
            endAdornment: tipo === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Icon>visibility_off</Icon> : <Icon>visibility</Icon>}
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        >
        </TextField>
      )}
    />
  );
};
