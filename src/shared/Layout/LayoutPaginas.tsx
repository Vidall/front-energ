import React from 'react';
import { Box, Button, Card, CardMedia, Icon, useMediaQuery, Theme, Typography } from '@mui/material';
import { useDrawerContext } from '../Contexts';
import { TituloPagina } from '../Components';

interface IDetalheProps {
  titulo: string;
  children?: React.ReactNode
}

/*eslint-disable react/prop-types*/
export const LayoutPaginas: React.FC<IDetalheProps> = ({ titulo, children }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const {toggleDrawerOpen } = useDrawerContext();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1} height={'100vh'}>
      <Box display={'flex'} alignItems={'center'} padding={1}>
        { smDown && (
          <Button variant="contained" onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </Button>
        )}
        <Box flex={1} display="flex" justifyContent="end">
          <Card sx={{ maxWidth: 90, border: 'none', bgcolor:'transparent'}} variant="outlined">
            <CardMedia
              sx={{
                height: 30      
              }}
              component="img"
              image="/logoEnerg512.png"
              alt="Logo"
            />
          </Card>
        </Box>
      </Box>

      <Box padding={1}>
        <TituloPagina titulo={titulo}/>
      </Box>

      <Box flex={1} overflow={'auto'} padding={1}>
        {children}
      </Box>

      <Box
        component="footer"
        textAlign={'center'}
        padding={1}
      >
        <Typography>
          CopyRight©2024 - Luan vidal & Pedro Ivo
        </Typography>
      </Box>
    </Box>
  );
};
