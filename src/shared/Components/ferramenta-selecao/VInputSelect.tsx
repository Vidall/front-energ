import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IGrupo {
  id: number;
  name: string;
}

interface IInputSelectProps {
  dataSelect: IGrupo[];
}

/*eslint-disable react/prop-types*/

export const VInputSelect: React.FC<IInputSelectProps> = ({ dataSelect}) => {
  const [grupo, setGrupo] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedGrupoId = event.target.value as string;
    setGrupo(selectedGrupoId);
    searchParams.set('grupo', selectedGrupoId);
    setSearchParams(searchParams);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Cadastrados</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={grupo}
        label={'Cadastrados'}
        onChange={handleChange}
        size='small'
      >
        {dataSelect.map((valor: IGrupo) => (
          <MenuItem value={valor.id} key={valor.id}>{valor.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
