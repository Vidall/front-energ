import { useSearchParams } from 'react-router-dom';
import { FerramentaNavegacao, FerramentaTabela } from '../../shared/Components';
import { LayoutPaginas } from '../../shared/Layout';
import { DetalheOs } from './DetalheOS';
import { useEffect, useState } from 'react';
import { IOrdemComTotalCount, IOs } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { VCalendar } from '../../shared/forms/formOS';
import { Accordion, AccordionDetails, AccordionSummary, Button, Icon, LinearProgress, Pagination, Skeleton, Typography } from '@mui/material';
import { ServicosService } from '../../shared/Service/api-JAVA/servicos/ServicosService';
import { Environment } from '../../shared/Enviroment';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const PaginaOS: React.FC = () => {
  const [ordensServicos, setOrdensServicos] = useState<IOs[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tipo = searchParams.get('tipo');
  const dataInicio = searchParams.get('startDay');
  const dataFim = searchParams.get('endDay');

  useEffect(() => {
    setIsLoading(true);
    OrdemServicoService.getAll(currentPage)
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          setIsLoading(false);
          return res.message;
        }
        setOrdensServicos(res.data._embedded.orderAllDTOOutputList);
        setTotalPages(res.totalCount);
        setIsLoading(false);
      });

  },[currentPage]);

  const handleClickFilter = () => {
    setIsLoading(true);
    if (!dataInicio || !dataFim) {
      return alert('Selecionar as datas');
    }
    if (dataFim < dataInicio) {
      return alert('Data fim menor que a data incio');
    }

    OrdemServicoService.getAllFilter(dataInicio!, dataFim!)
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          setIsLoading(false);
          return res.message;
        
        }

        if (res.data._embedded) {
          setOrdensServicos(res.data._embedded.orderAllDTOOutputList);
          setTotalPages(res.totalCount);
          setIsLoading(false);
        }
        setIsLoading(false);
      });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // Atualizar os parâmetros de pesquisa ou fazer outra ação necessária
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: value.toString() }, { replace: true });
    // setIsload(false);
  };

  return (
    <LayoutPaginas
      titulo="Área ordens serviços"
    >
      <FerramentaNavegacao
        listaNavegacao={['Todos', 'Cadastrar']}
      />

      {tipo === 'Todos' && (
        <>
          
          <Accordion>
            <AccordionSummary
              expandIcon={<Icon>expand_more</Icon>}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>
                Buscar por data
              </Typography>
                
            </AccordionSummary>
            <AccordionDetails>
              <VCalendar></VCalendar>
              <Button
                variant='contained'
                sx={{marginTop: 2}}
                onClick={handleClickFilter}
              >
                  Filtrar
              </Button>
            </AccordionDetails>
          </Accordion>

          <FerramentaTabela
            cabecalho={['id', 'status', 'scheduledDate']}
            dados={ordensServicos}
            pagina='ordens-de-servicos'
          />
          { isLoading && (
            <LinearProgress/>
          )}
          <Pagination 
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
          
        </>
      )}

      { tipo === 'Cadastrar' && (
        <DetalheOs/>
      )

      }
    </LayoutPaginas>
  );
};