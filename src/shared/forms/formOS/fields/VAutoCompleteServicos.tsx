import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IOs, IServiceInOrder } from '../../../Service/api-JAVA/models/OrdemServico';
import { OrdemServicoService } from '../../../Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useSearchParams } from 'react-router-dom';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface IAutoComplete {
  name: NestedKeyOf<IServiceInOrder>;
  control: Control<IServiceInOrder>;
  errors: FieldErrors<IServiceInOrder>;
  label: string;
  rules?: any;
  editing?: boolean;
  type?: 'text' | 'number'
}

interface IRowsProps {
  id: number;
  label: string;
}

export const VAutoCompleteServicos: React.FC<IAutoComplete> = ({ name, control, errors, label, rules, editing = false }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<IRowsProps[]>([]);
  const [searchParams] = useSearchParams(); 

  const id = searchParams.get('grupo');

  useEffect(() => {
    setIsLoading(true);
    OrdemServicoService.getByID(Number(id), 0, 1000)
      .then(res => {
        if(res instanceof Error) {
          setIsLoading(false);
          alert(res.message);
          return res.message;
        }

        if (res._embedded) {
          const mappedRows = res._embedded.serviceDTOOutputList.map(item => ({
            id: item.id,
            label: item.name,
          }));
          setRows(mappedRows);
        } else {
          setRows([{ id: 0, label: 'Sem serviço' }]);
        }

        setIsLoading(false);
      })
      .catch(error => console.error(error));

  }, [id]);

  const handleChange = (event: any, newValue: IRowsProps | null, onChange: (value: number | null) => void) => {
    if (newValue) {
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
          loading={isLoading}
          popupIcon={isLoading ? <CircularProgress size={20} /> : undefined}
          fullWidth
          size='small'
          id="combo-box-demo"
          options={rows}
          getOptionLabel={(option) => option.label} // Mostrar o label no campo de texto
          isOptionEqualToValue={(option, value) => value !== null && option.id === value.id} // Comparar as opções pelo ID
          onChange={(event, newValue) => handleChange(event, newValue, onChange)} // Ajusta o handleChange para passar o ID
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  );
};
