import { FerramentaNavegacao, FerramentaTabela } from '../../shared/Components';
import { FerramentaPesquisar } from '../../shared/Components/ferramentas-pesquisar/FerramentaPesquisar';
import { ITecnico } from '../../shared/Service/api-TS/models/Tecnico';
import { LayoutPaginas } from '../../shared/Layout';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { TecnicoService } from '../../shared/Service/api-TS/tecnicos/TecnicoService';
import { LinearProgress, Pagination } from '@mui/material';
import { Environment } from '../../shared/Enviroment';
import { VFormTecnico } from '../../shared/forms';

export const PaginaTecnico: React.FC = () => {
  const [searchParms, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<ITecnico[] >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoad, setIsload] = useState(true);
  const busca = useMemo(() => searchParms.get('busca') || '', [searchParms]);
  const [debouncedBusca] = useDebounce(busca, 1000);

  const tipo = searchParms.get('tipo');
 
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // Atualizar os parâmetros de pesquisa ou fazer outra ação necessária
    setSearchParams({ ...Object.fromEntries(searchParms.entries()), page: value.toString() }, { replace: true });
    setIsload(false);
  };

  useEffect(() => {
    setIsload(true);

    TecnicoService.getAll(debouncedBusca, currentPage)
      .then(res => {
        if (res instanceof Error) {
          return res.message;
        }

        setRows(res.data);
        setTotalCount(res.totalCount);
        setIsload(false);
      });
  }, [debouncedBusca, currentPage]);

  return (
    <LayoutPaginas titulo="Área do técnico">
      { tipo === 'Todos' && (
        <>
          <FerramentaPesquisar
            textoDaBusca={busca}
            aoMudarTextoDaBusca={texto => setSearchParams({ ...Object.fromEntries(searchParms.entries()), busca: texto }, { replace: true })}  
          />

          <FerramentaNavegacao listaNavegacao={['Todos', 'Cadastrar']}/>
          { isLoad && (
            <LinearProgress/>
          )

          }

          <FerramentaTabela pagina='tecnicos' cabecalho={['nome','telefone', 'email']} dados={rows}/>
          <Pagination
            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      )

      }

      { tipo === 'Cadastrar' && (
        <VFormTecnico/>
      )

      }

    </LayoutPaginas>
  );
};