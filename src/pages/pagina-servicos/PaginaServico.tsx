import { Box, Pagination, Paper } from '@mui/material';
import { FerramentaNavegacao, FerramentaTabela, VInputSelect } from '../../shared/Components';
import { LayoutPaginas } from '../../shared/Layout';
import { useEffect, useState } from 'react';
import { GruposServicosService } from '../../shared/Service/api-JAVA/grupos-servicos/GruposServicosService';
import { useSearchParams } from 'react-router-dom';
import { IServices } from '../../shared/Service/api-JAVA/models/GruposServicos';
import { VFormServicos } from '../../shared/forms/formServicos';

export const PaginaServico: React.FC = () => {
  const [grupoServicoData, setGrupoServicoData] = useState<{id: number, name: string}[]>();
  const [searchParams, setSearchParms] = useSearchParams('1');
  const [rows, setRows] = useState<IServices[]>([]);
  const [totalCount, SetTotalCount] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const tipo = searchParams.get('tipo');
  const grupo = searchParams.get('grupo');
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);

    setSearchParms({...Object.fromEntries(searchParams.entries()), page: value.toString() }, {replace: true});
    // setIsload(false)
  };

  useEffect(() => {
    GruposServicosService.getAll()
      .then(res => {
        if (res instanceof Error) {
          alert('passou na instancia');
          return res.message;
        }
        
        setGrupoServicoData(res.data._embedded.groupAllDTOOutputList);

      });
  }, []);

  useEffect(() => {
    if (grupo) {
      GruposServicosService.getByID(Number(grupo), currentPage - 1, 5)
        .then(res => {
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }

          if (res._embedded) {
            setRows(res._embedded.serviceDTOOutputList);
            SetTotalCount(res.totalCount);
            
          }

        });
    }
  }, [grupo, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [grupo]);

  return (
    <LayoutPaginas 
      titulo='Área serviços'
    >

      { tipo === 'Todos' && (
        <>
          <FerramentaNavegacao
            listaNavegacao={['Todos', 'Cadastrar']}
          />

          <Paper component={Box} padding={1}>
            <VInputSelect
              dataSelect={grupoServicoData ? grupoServicoData : [{id: 0, name: 'não foi possível consultar'}]}
            />
          </Paper>

          <FerramentaTabela 
            cabecalho={['name']}
            dados={rows}
            pagina='grupos_servicos'
          />

          <Pagination count={totalCount || 20}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      )
      }

      { tipo === 'Cadastrar' && (
        <VFormServicos/>

      )

      }
      
    </LayoutPaginas>
    
  );
};