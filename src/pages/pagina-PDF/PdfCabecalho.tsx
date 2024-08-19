import React from 'react';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { Box, Grid, Paper, styled } from '@mui/material';

interface IPropsCabecalho {
  dadosCliente: TPessoa
}

export const PdfCabecalho: React.FC<IPropsCabecalho> = ({ dadosCliente }) => {

  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    border: '0.5px solid black',
    color: theme.palette.text.secondary,
  }));
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'black',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'black',
          },
        }}
      >
        <Grid
          padding={2}
          alignItems={'center'}
          justifyContent={'start'}
          minHeight={80}
          container
          xs={4} sm={4} md={4} lg={4}
        >
          <img src='/logoEnerg.png' style={{width: 150}}></img>
        </Grid>
        <Grid
          padding={2}
          alignItems={'center'}
          justifyContent={'center'}
          minHeight={80} 
          container
          xs={4} sm={4} md={4} lg={4}
        >
          tudo
        </Grid>
        <Grid
          padding={2}
          alignItems={'center'}
          justifyContent={'end'}
          minHeight={80}
          container
          xs={4} sm={4} md={4} lg={4}
        >
          bem
        </Grid>
      </Grid>
    </Box>
  );
};
