import { FilledInput, FormControl, Icon, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';

export const VPasswordField: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ p: 1}} variant='outlined' fullWidth
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <FilledInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
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
        }
      />
      
    </FormControl>
  );
};