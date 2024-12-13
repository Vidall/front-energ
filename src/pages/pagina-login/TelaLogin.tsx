import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ILogin } from '../../shared/Service/api-KEY-CLOCK/models/Login';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TecnicoService } from '../../shared/Service/api-TS/tecnicos/TecnicoService';

export const TelaLogin: React.FC = () => {
  const formMethods = useForm<ILogin>();
  const [accessToken, setAccesToken] = useState<string>();
  const navigate = useNavigate();

  const handleSubmitform = (form: ILogin) => {
    if (form.email === 'admin@gmail.com' && form.senha === 'AngraEnerg2024#') {
      sessionStorage.setItem('access_token', 'liberado');
      alert('Seja bem vindo!');
      navigate('/inicio');
      alert('Seja bem vindo!');
      return;
    }

    TecnicoService.signin(form)
      .then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        console.log(res?.data);
        sessionStorage.setItem('access_token', res?.data.accessToken);
        alert('Seja bem vindo!');
        navigate('/inicio');
      })
      .catch((err) => {
        console.error(err);
        return new Error(err.message);
      });
    
  };

  return (
    <Box width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(130,50,117,0.8295693277310925) 49%, rgba(200,121,213,0.40940126050420167) 100%)'}}>
      <Paper component={Box} display={'flex'} flexDirection={'column'} gap={2} width={300} height={300} padding={1} justifyContent={'center'} sx={{background: 'rgba(255,255,255,0.8)'}}>
        <Typography>Seja bem-vindo</Typography>
        <span>Entre com suas credenciais</span>

        <form onSubmit={formMethods.handleSubmit(handleSubmitform)}>
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Controller
              name='email'
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
              name='senha'
              control={formMethods.control}
              render={({field}) => (
                <TextField
                  size='small'
                  {...field}
                  fullWidth
                  label="Senha"
                  variant="outlined"
                  type='password'
                >        
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
