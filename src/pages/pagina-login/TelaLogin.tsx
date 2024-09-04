import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ILogin } from '../../shared/Service/api-JAVA/models/Login';
import { useState } from 'react';

export const TelaLogin: React.FC = () => {
  const formMethods = useForm<ILogin>();
  const [isFieldVisible, setIsVisible] = useState(false);

  const handleSubmitform = (form: any) => {
    console.log(form);
  };

  return (
    <Box width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(130,50,117,0.8295693277310925) 49%, rgba(200,121,213,0.40940126050420167) 100%)'}}>
      <Paper component={Box} display={'flex'} flexDirection={'column'} gap={2} width={300} height={300} padding={1} justifyContent={'center'} sx={{background: 'rgba(255,255,255,0.8)'}}>
        <Typography>Seja bem vindo</Typography>
        <span>Entre com suas credências</span>

        <form onSubmit={formMethods.handleSubmit(handleSubmitform)}>
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Controller
              name='username'
              control={formMethods.control}
              render={({field}) => (
                <TextField
                  size='small'
                  {...field}
                  fullWidth
                  label="E-mail"
                  variant="outlined">        
                </TextField>
              )}
            />

            <Controller
              name='password'
              control={formMethods.control}
              render={({field}) => (
                <TextField
                  size='small'
                  {...field}
                  fullWidth
                  label="Senha"
                  variant="outlined">        
                </TextField>
              )}
            />
          </Box>
          <Box display={'none'}>
            <Controller
              name='grant_type'
              defaultValue='password'
              control={formMethods.control}
              render={({field}) => (
                <TextField
                  {...field}
                  fullWidth
                  label="grand-type"
                  variant="outlined">        
                </TextField>
              )}
            />
            <Controller
              name='client_id'
              defaultValue={process.env.REACT_APP_CLIENT_ID}
              control={formMethods.control}
              render={({field}) => (
                <TextField
                  {...field}
                  fullWidth
                  label="cliente_id"
                  variant="outlined">        
                </TextField>
              )}
            />
          </Box>

          <Box display={'flex'} justifyContent={'space-between'} paddingTop={1}>
            <Button variant='outlined' size='small'>Limpar</Button>
            <Button variant='contained' type='submit' size='small'>Entrar</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};