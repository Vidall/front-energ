import { Box, Paper } from '@mui/material';
import { FerramentaNavegacao, FerramentaTabela, VInputSelect } from '../../shared/Components';
import { LayoutPaginas } from '../../shared/Layout';
import { useEffect, useState } from 'react';
import { GruposServicosService } from '../../shared/Service/api-JAVA/grupos-servicos/GruposServicosService';
import { useSearchParams } from 'react-router-dom';
import { IServiceDTOOutputList } from '../../shared/Service/api-JAVA/models/GruposServicos';

export const PaginaServico: React.FC = () => {
  const [grupoServicoData, setGrupoServicoData] = useState<{id: number, name: string}[]>();
  const [searchParams, setSearchParms] = useSearchParams('1');
  const [rows, setRows] = useState<[]>();

  const grupo = searchParams.get('grupo');

  useEffect(() => {
    GruposServicosService.getAll()
      .then(res => {
        if (res instanceof Error) {
          alert('passou na instancia');
          console.log(res);
          return res.message;
        }
        
        console.log('renderizou os grupos');
        
        console.log(res.data._embedded.groupAllDTOOutputList);
        setGrupoServicoData(res.data._embedded.groupAllDTOOutputList);
      });
  }, []);

  useEffect(() => {
    GruposServicosService.getByID(Number(grupo))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        console.log(res.data);
      });
  }, [grupo]);

  return (
    <LayoutPaginas 
      titulo='Área serviços'
    >

      <FerramentaNavegacao
        listaNavegacao={['Todos', 'Cadastrar']}
      />

      <Paper component={Box} padding={1}>
        <VInputSelect
          grupoServicoData={grupoServicoData ? grupoServicoData : [{id: 0, name: 'teste'}]}
        />
      </Paper>

      <FerramentaTabela 
        cabecalho={['name']}
        dados={[{name: 'luan'}]}
        pagina='grupos_servicos'
      />
      
    </LayoutPaginas>
    
  );
};