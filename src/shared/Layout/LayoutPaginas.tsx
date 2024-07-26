import React from 'react';
import { Box, Button, Card, CardMedia, Icon, useMediaQuery, Theme } from '@mui/material';
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

    <Box padding={1}  display={'flex'} flexDirection={'column'} gap={1} >
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
        { smDown && (
          <Button variant="contained" onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </Button>
        )

        }

        <Box flex={1} display="flex" justifyContent="end">
          <Card sx={{ maxWidth: 90, border: 'none' }} variant="outlined">
            <CardMedia
              sx={{
                height: 30,
              }}
              component="img"
              image="/logoEnerg.png"
              alt="Logo"
            />
          </Card>
        </Box>
      </Box>

      <TituloPagina titulo={titulo}/>

      <Box flex={1} overflow={'auto'} height={'85vh'}>
        
        {children}
        
      </Box>

      {/* <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 2,
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        footer
      </Box> */}

    </Box>

  );
};