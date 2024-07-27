import { Grid } from '@mui/material';

import { BotaoMenu } from '../../shared/Components';
import { LayoutPaginas } from '../../shared/Layout';

export const PaginaInicial = () => {
  return (
    <LayoutPaginas 
      titulo='seja bem vindo'
    >
      <Grid container  >

        <Grid container item justifyContent={'center'}>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'} marginBottom={2}>
            <BotaoMenu to={'/ordens-de-servicos'} texto='Os' nomeIcone='miscellaneous_services'/>
          </Grid>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'}>
            <BotaoMenu to={'/clientes?tipo=Fisico'} texto='Clientes' nomeIcone='people'/>
          </Grid>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'}>
            <BotaoMenu to={'/tecnicos'} texto='Técnicos' nomeIcone='engineering'/>
          </Grid>

          <Grid item xs={6} md={4} lg={2} display={'flex'} justifyContent={'center'}>
            <BotaoMenu to={'/servicos'} texto='Serviços' nomeIcone='build'/>
          </Grid>

        </Grid>      

      </Grid>

    </LayoutPaginas>
  );
};