import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

interface INavegacao {
  listaNavegacao: string[],
  
}

export const FerramentaNavegacao: React.FC<INavegacao> = ({ listaNavegacao }) => {
  const [, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(0);

  return (
    <Box>
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
        setValue(newValue);
        setSearchParams({ tipo: listaNavegacao[newValue] });
      }}>
        {listaNavegacao.map((item, index) => (
          <BottomNavigationAction key={index} label={item} />
        ))}
      </BottomNavigation>
    </Box>
  );
};
