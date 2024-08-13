import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

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

  const handleValueType = (valor: IGrupo) => {
    if (isValueType && valor.id.toString() === '1') {
      return 'PREVENTIVA';
    } else if (isValueType && valor.id.toString() === '2') {
      return 'CORRETIVA';
    }
    valor.id.toString();
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Cadastrados</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={'Cadastrados'}
        onChange={onChange}
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
