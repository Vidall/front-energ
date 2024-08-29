import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { PessoaFisicaService } from '../../../Service/api-TS/clientes/PessoaFisicaService';
import { PessoaJuridicaService } from '../../../Service/api-TS/clientes/PessoaJuridicaService';
import { useDebounce } from 'use-debounce';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IOs } from '../../../Service/api-JAVA/models/OrdemServico';
import { IEndereco, IPessoaFisica, IPessoaJuridica } from '../../../Service/api-TS/models/Clientes';
import { useSearchParams } from 'react-router-dom';

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
export const VAutoCompletePessoa: React.FC<IAutoComplete> = ({ tipo, name, control, errors, label, rules, editing = false, onEnderecoChange }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<IRowsProps[]>([]);
  const [endereco, setEndereco] = useState<IEndereco>();
  const [dadoCliente, setDadosCliente] = useState<IPessoaFisica[] | IPessoaJuridica[]>();

  const [searchParms, setSearchParams] = useSearchParams();

  const [busca, setBusca] = useState('');
  const [buscaDebounce] = useDebounce(busca, 500);

  useEffect(() => {
    console.log(tipo)
    if (tipo === 'FISICO') {
      setIsLoading(true);
      PessoaFisicaService.getAll(buscaDebounce)
        .then(res => {
          if(res instanceof Error) {
            alert(res.message);
            return res.message;
          }
          const idCliente = res.data.map(item => item.id)[0]?.toString() || '0'; 
          if (idCliente === '0') return alert('Não possui pessoa fisica cadastrada')
          setSearchParams({ ...Object.fromEntries(searchParms.entries()), idCliente: idCliente }, { replace: true });
          setDadosCliente(res.data);
          setRows(res.data.map(pessoa => ({ id: pessoa.id!, label: pessoa.nome })));
          setIsLoading(false);
          const enderecoObtido = res.data[0]?.endereco;
          if (enderecoObtido) {
            setEndereco(enderecoObtido);
            onEnderecoChange(enderecoObtido); // Passa o endereço imediatamente para o componente pai
          }

        })
        .catch(error => console.error(error));
    } else if (tipo === 'JURIDICO') {
      setIsLoading(true);
      PessoaJuridicaService.getAll(buscaDebounce)
        .then(res => {
          if(res instanceof Error) {
            alert(res.message);
            return res.message;
          }
          const idCliente = res.data.map(item => item.id)[0]?.toString() || '0'; 
          if (idCliente === '0') return alert('Não possui pessoa fisica cadastrada')
          console.log(idCliente)
          setSearchParams({ ...Object.fromEntries(searchParms.entries()), idCliente }, { replace: true });
          setDadosCliente(res.data);
          setRows(res.data.map(pessoa => ({ id: pessoa.id!, label: pessoa.nome })));
          setIsLoading(false);
          const enderecoObtido = res.data[0]?.endereco;
          if (enderecoObtido) {
            setEndereco(enderecoObtido);
            onEnderecoChange(enderecoObtido); // Passa o endereço imediatamente para o componente pai
          }
        })
        .catch(error => console.error(error));
    }
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