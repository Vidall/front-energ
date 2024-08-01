import { Box, FormControl, FormControlLabelProps, FormLabel, RadioGroup, Typography } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { IUpdateTecnico } from '../../../Service/api/models/Tecnico';

interface VTextFieldProps {
  children: React.ReactElement<FormControlLabelProps> | React.ReactElement<FormControlLabelProps>[]
  errors: FieldErrors<IUpdateTecnico>;
  control: Control<IUpdateTecnico>;
  name: keyof IUpdateTecnico ;
  label: string;
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  defaultValue: any
  rules?: any;
}

/*eslint-disable react/prop-types*/
export const VRadioFieldTecnico: React.FC<VTextFieldProps> = ({name, control, errors, label, rules, children, defaultValue}) => {
  return (
    <FormControl component="fieldset">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              {...field}
              row
              aria-label={label}
            >
              <Box display={'flex'} justifyContent={'space-between'}>
                {children as React.ReactNode}
              </Box>
            </RadioGroup>
          </>
        )}
      />
      {errors.admin && <Typography component={'span'} color={'#d32f2f'}>{errors.admin.message}</Typography>}
    </FormControl>
  );
};