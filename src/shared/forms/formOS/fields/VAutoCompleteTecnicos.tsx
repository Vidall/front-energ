import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TecnicoService } from '../../../Service/api-TS/tecnicos/TecnicoService';
import { useDebounce } from 'use-debounce';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IOs } from '../../../Service/api-JAVA/models/OrdemServico';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface IRowsProps {
  id: number;
  label: string;
}

interface VTextFieldOsProps {
  name: NestedKeyOf<IOs>;
  control: Control<IOs>;
  errors: FieldErrors<IOs>;
  label: string;
  rules?: any;
  editing?: boolean;
  type?: 'text' | 'number';
}

/*eslint-disable react/prop-types*/
export const VAutoCompleteTecnicos: React.FC<VTextFieldOsProps> = ({
  name,
  control,
  errors,
  label,
  rules,
  editing = false,
}) => {
  const [rows, setRows] = useState<IRowsProps[]>([]);
  const [busca, setBusca] = useState('');
  const [buscaDebounce] = useDebounce(busca, 500);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    TecnicoService.getAll(buscaDebounce)
      .then((res) => {
        if (res instanceof Error) {
          return res.message;
        }
        setRows(res.data.map((tecnico) => ({ id: tecnico.id!, label: tecnico.nome })));
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [buscaDebounce]);

  const handleChange = (event: any, newValue: IRowsProps | null, onChange: (value: number | null) => void) => {
    if (newValue) {
      onChange(newValue.id); // Passa apenas o ID para o estado do formulário
    } else {
      onChange(null); // Nenhum valor selecionado, passa null
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...field } }) => (
        <Autocomplete
          {...field}
          loadingText="Carregando..."
          noOptionsText="Sem opção"
          disablePortal
          value={rows.find((option) => option.id === value) || null} // Encontrar a opção correspondente ao ID
          onInputChange={(_, newValue) => setBusca(newValue)}
          loading={isLoading}
          popupIcon={isLoading ? <CircularProgress /> : undefined}
          fullWidth
          size="small"
          id="combo-box-demo"
          options={rows}
          onChange={(event, newValue) => handleChange(event, newValue, onChange)} // Ajusta o handleChange para passar o ID
          renderInput={(params) => <TextField {...params} label="Escolha o técnico" />}
        />
      )}
    />
  );
};
