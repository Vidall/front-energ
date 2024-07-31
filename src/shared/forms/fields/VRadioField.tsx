import { Box, FormControl, FormControlLabelProps, FormLabel, RadioGroup, Typography } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IPessoaFisica, IPessoaJuridica, TPessoaFisicaOuJuridica } from '../../Service/api/models/Clientes';

interface VTextFieldProps {
  name: 'id' | 'nome' | 'endereco' | 'email' | 'cnpj' | 'tipo' | 'nomeContato' | 'possuiContrato' | 'tipoContrato' | 'cpf' | 'telefone' | 'endereco.rua' | 'endereco.numero' | 'endereco.bairro' | 'endereco.cidade';
  control: Control<TPessoaFisicaOuJuridica>;
  errors: FieldErrors<TPessoaFisicaOuJuridica>;
  label: string;
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  rules?: any;
  data?: IPessoaFisica | IPessoaJuridica
  children: React.ReactElement<FormControlLabelProps> | React.ReactElement<FormControlLabelProps>[]
  defaultValue?: any;
}

/*eslint-disable react/prop-types*/
export const VRadioField: React.FC<VTextFieldProps> = ({name, control, errors, label, rules, children, defaultValue}) => {
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
      {errors.tipoContrato && <Typography component={'span'} color={'#d32f2f'}>{errors.tipoContrato.message}</Typography>}
    </FormControl>
  );
};