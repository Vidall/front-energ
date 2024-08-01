import { TextField } from '@mui/material';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TPessoaFisicaOuJuridica } from '../../../Service/api/models/Clientes';

interface VTextFieldProps {
  name: 'id' | 'nome' | 'endereco' | 'email' | 'cnpj' | 'tipo' | 'nomeContato' | 'possuiContrato' | 'tipoContrato' | 'cpf' | 'telefone' | 'endereco.rua' | 'endereco.numero' | 'endereco.bairro' | 'endereco.cidade';
  control: Control<TPessoaFisicaOuJuridica>;
  errors: FieldErrors<TPessoaFisicaOuJuridica>;
  label: string;
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  rules?: any;
  editing?: boolean 
}

/*eslint-disable react/prop-types*/

export const VTextFieldCliente: React.FC<VTextFieldProps> = ({ name, control, errors, label, rules, editing=false }) => {
  const error = name !== undefined ? name.split('.').reduce((acc, key) => acc?.[key] ?? null, errors as any) : 'Erro ao validar o campo';
  
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
