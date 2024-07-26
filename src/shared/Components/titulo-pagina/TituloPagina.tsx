import { Box, Typography } from '@mui/material';

interface ITituloPagina {
  titulo: string
}

/*eslint-disable react/prop-types*/
export const TituloPagina: React.FC<ITituloPagina> = ({titulo}) => {
  return (
    <Box>
      <Typography>
        {titulo}
      </Typography>
    </Box>
  );
};
