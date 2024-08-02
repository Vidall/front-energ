import { Box, Paper } from '@mui/material';
import { FerramentaNavegacao, FerramentaTabela, VInputSelect } from '../../shared/Components';
import { LayoutPaginas } from '../../shared/Layout';
import { useEffect } from 'react';

export const PaginaServico: React.FC = () => {

  const grupoServicoData = [
    {
      id: 1,
      name: 'Grupo gerador'
    },
    {
      id: 2,
      name: 'Grupo Motor'
    }
  ];

  useEffect(() => {
    const servico = (id: number) => {
      console.log(id);
    };
  }, []);

  return (
    <LayoutPaginas 
      titulo='Área serviços'
    >

      <FerramentaNavegacao
        listaNavegacao={['Todos', 'Cadastrar']}
      />

      <Paper component={Box} padding={1}>
        <VInputSelect
          grupoServicoData={grupoServicoData}
        />
      </Paper>

      <FerramentaTabela 
        cabecalho={['name']}
        dados={[{name: 'troca de correia'}]}
        pagina='grupos_servicos'
      />
      
    </LayoutPaginas>
    
  );
};