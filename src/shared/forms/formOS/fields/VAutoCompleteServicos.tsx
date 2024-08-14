import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { PessoaFisicaService } from '../../../Service/api-TS/clientes/PessoaFisicaService';
import { PessoaJuridicaService } from '../../../Service/api-TS/clientes/PessoaJuridicaService';
import { useDebounce } from 'use-debounce';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IOs } from '../../../Service/api-JAVA/models/OrdemServico';
import { IEndereco } from '../../../Service/api-TS/models/Clientes';
import { GruposServicosService } from '../../../Service/api-JAVA/grupos-servicos/GruposServicosService';
import { useParams } from 'react-router';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface IAutoComplete {
  tipo: string;
  name: NestedKeyOf<IOs>;
  control: Control<IOs>;
  errors: FieldErrors<IOs>;
  label: string;
  rules?: any;
  editing?: boolean;
  type?: 'text' | 'number'
  onEnderecoChange: (endereco: IEndereco) => void
}

interface IRowsProps {
  id: number;
  label: string;
}

/*eslint-disable react/prop-types*/
export const VAutoCompleteServicos: React.FC<IAutoComplete> = ({ tipo, name, control, errors, label, rules, editing = false, onEnderecoChange }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<IRowsProps[]>([]);
  const [endereco, setEndereco] = useState<IEndereco>();
  const { grupo } = useParams();

  const [busca, setBusca] = useState('');
  const [buscaDebounce] = useDebounce(busca, 500);

  const 

  useEffect(() => {
    GruposServicosService.getByID(Number(grupo))
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          return res.message;
        }
        })
      .catch(error => console.error(error));
    
  }, [buscaDebounce, tipo]);

  const handleChange = (event: any, newValue: IRowsProps | null, onChange: (value: number | null) => void) => {
    if (newValue && endereco) {
      onEnderecoChange(endereco);
      onChange(newValue.id); // Passa apenas o ID para o estado do formulário
    } else {
      onChange(null); // Nenhum valor selecionado, passa null
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ...field } }) => (
        <Autocomplete
          {...field}
          loadingText='Carregando...'
          noOptionsText='Sem opção'
          disablePortal
          value={rows.find(option => option.id === value) || null} // Encontrar a opção correspondente ao ID
          onInputChange={(_, newValue) => setBusca(newValue)}
          loading={isLoading}
          popupIcon={isLoading ? <CircularProgress /> : undefined}
          fullWidth
          size='small'
          id="combo-box-demo"
          options={rows}
          onChange={(event, newValue) => handleChange(event, newValue, onChange)} // Ajusta o handleChange para passar o ID
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  );
};