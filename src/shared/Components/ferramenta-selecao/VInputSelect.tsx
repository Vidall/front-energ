import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IGrupo {
  id: number;
  name: string;
}

interface IInputSelectProps {
  dataSelect: IGrupo[];
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  isValueType?: boolean
}

export const VInputSelect: React.FC<IInputSelectProps> = ({ dataSelect, value, onChange, isValueType=false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [grupo, setGrupo] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedGrupoId = event.target.value as string;
    setGrupo(selectedGrupoId);
    searchParams.set('grupo', selectedGrupoId);
    setSearchParams(searchParams);

    if (onChange) {
      onChange(event); // Chama o onChange passado via props
    }
  };

  const handleValueType = (valor: IGrupo) => {
    if (isValueType && valor.id.toString() === '1') {
      return 'PREVENTIVA';
    } else if (isValueType && valor.id.toString() === '2') {
      return 'CORRETIVA';
    }
    return valor.id.toString();
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Cadastrados</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={'Cadastrados'}
        onChange={handleChange}
        size='small'
      >
        {dataSelect.map((valor: IGrupo) => (
          <MenuItem value={handleValueType(valor)} key={valor.id}>
            {valor.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
