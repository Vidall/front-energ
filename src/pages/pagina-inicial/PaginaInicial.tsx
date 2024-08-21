import { Box, Grid, Paper, Typography } from '@mui/material';
import { BotaoMenu } from '../../shared/Components';
import { LayoutPaginas } from '../../shared/Layout';
import { useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';

export const PaginaInicial = () => {
  const [totalCount, setTotalCount] = useState<number>();
  const [ordensAgendadas, setOrdensAgendadas] = useState<number>();

  useEffect(() => {
    OrdemServicoService.getCountOrdens()
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        setTotalCount(res.total);
        setOrdensAgendadas(res.abertas);
      })
      .catch();
  }, []);

  return (
    <LayoutPaginas titulo='Seja bem vindo'>
      <Grid container>

        <Grid container item justifyContent={'center'}>
          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'} marginBottom={2}>
            <BotaoMenu to={'/ordens-de-servicos?tipo=Todos'} texto='Os' nomeIcone='miscellaneous_services' />
          </Grid>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'}>
            <BotaoMenu to={'/clientes?tipo=Fisico'} texto='Clientes' nomeIcone='people' />
          </Grid>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'}>
            <BotaoMenu to={'/tecnicos?tipo=Todos'} texto='Técnicos' nomeIcone='engineering' />
          </Grid>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'}>
            <BotaoMenu to={'/servicos?tipo=Todos&grupo=1'} texto='Serviços' nomeIcone='build' />
          </Grid>
        </Grid>

      </Grid>

      <Grid container>

        <Grid container item justifyContent={'center'}>
          
          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'} paddingTop={1.5}>
            <Box
              component={Paper}
              width={130}
              height={130}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
            >
              <Box flexGrow={1} display="flex" alignItems="center">
                <Typography variant="h4">{ordensAgendadas}</Typography>
              </Box>
              <Typography variant="body2">Agendadas</Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'} paddingTop={1.5}>
            <Box
              component={Paper}
              width={130}
              height={130}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
            >
              <Box flexGrow={1} display="flex" alignItems="center" justifyContent={'center'}>
                <Typography variant="h4">{totalCount}</Typography>
              </Box>
              <Typography variant="body2">Totais</Typography>
            </Box>
          </Grid>

        </Grid>

      </Grid>

    </LayoutPaginas>
  );
};
