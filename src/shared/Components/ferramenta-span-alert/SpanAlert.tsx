import { Alert, Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Environment } from '../../Enviroment';
import { useNavigate } from 'react-router';

interface ISpanProps {
  /**
   * Tipo é o tipo do alert que vai voltar se deu sucesso ou erro
   */
  tipo: 'success' | 'error'
  /**
   * Mensagem que vai retornar no span
  */
  message: string

  /**
   * Caminho que vai ser jogado o cliente depois do alert
   */
  caminho?: string
  isNavigate: boolean
}

export const SpanAlert: React.FC<ISpanProps> = ({tipo, message, isNavigate=false}) => {
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
      if (isNavigate) navigate(`${Environment.CAMINHO_TECNICOS}?tipo=Todos`);
    }, 1200);
  }, [tipo]);

  return (
    <>
      {isAlert && (
        <Box position={'absolute'} top={0} width={'100vw'}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={tipo}>
              {message}
            </Alert>
          </Stack>
        </Box>
      )}
    </>
  );
};