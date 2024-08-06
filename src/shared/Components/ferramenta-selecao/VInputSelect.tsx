import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IGrupo {
  id: number;
  name: string;
}

interface IInputSelectProps {
  grupoServicoData: IGrupo[];
}

/*eslint-disable react/prop-types*/

export const VInputSelect: React.FC<IInputSelectProps> = ({ grupoServicoData }) => {
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
      <InputLabel id="demo-simple-select-label">Grupos</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={grupo}
        label="Grupos"
        onChange={handleChange}
        size='small'
      >
        {grupoServicoData.map((valor: IGrupo) => (
          <MenuItem value={valor.id} key={valor.id}>{valor.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
