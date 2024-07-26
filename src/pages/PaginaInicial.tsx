import { Grid } from '@mui/material';
import { BotaoMenu } from '../shared/Components';
import { LayoutPaginas } from '../shared/Layout';

export const PaginaInicial = () => {
  return (
    <LayoutPaginas 
      titulo='seja bem vindo'

    >
      
      <Grid container  >

        <Grid container item >
          <Grid item xs={6} md={4} lg={2} display={'flex'} >
            <BotaoMenu texto='Clientes' nomeIcone='people'/>
          </Grid>

          <Grid item xs={6} md={4} lg={2}  >
            <BotaoMenu texto='Clientes' nomeIcone='people'/>
          </Grid>
          <Grid item xs={6} md={4} lg={2} >
            <BotaoMenu texto='Clientes' nomeIcone='people'/>
          </Grid>
          <Grid item xs={6} md={4} lg={2} >
            <BotaoMenu texto='Clientes' nomeIcone='people'/>
          </Grid>

        </Grid>      

      </Grid>

    </LayoutPaginas>
  );
};
