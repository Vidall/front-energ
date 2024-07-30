import { LinearProgress, Pagination } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { FerramentaPesquisar } from '../../shared/Components/ferramentas-pesquisar/FerramentaPesquisar';
import { PessoaJuridicaService } from '../../shared/Service/api/clientes/PessoaJuridicaService';
import { PessoaFisicaService } from '../../shared/Service/api/clientes/PessoaFisicaService';
import { IPessoaFisica, IPessoaJuridica } from '../../shared/Service/api/models/Clientes';
import { FerramentaNavegacao, FerramentaTabela } from '../../shared/Components';
import { VFormCliente } from '../../shared/forms/formCliente/VFormCliente';
import { Environment } from '../../shared/Enviroment';
import { LayoutPaginas } from '../../shared/Layout';
import { useSearchParams } from 'react-router-dom';

export const PaginaCliente: React.FC = () => {
  const [searchParms, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [rows, setRows] = useState<IPessoaFisica[] | IPessoaJuridica[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoad, setIsload] = useState(true);
  
  const tipo = searchParms.get('tipo')||'';
  const busca = useMemo(() => searchParms.get('busca') || '', [searchParms]);
  const [debouncedBusca] = useDebounce(busca, 1000);

  useEffect(() => {
    setIsload(true);

    if (tipo === 'Fisico') {
      PessoaFisicaService.getAll(debouncedBusca, Number(searchParms.get('page') || 1))
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
            return;
          }

          setRows(result.data);
          setTotalCount(result.totalCount);
          setIsload(false);
        });
    }else if (tipo === 'Juridico') {
      PessoaJuridicaService.getAll(debouncedBusca, Number(searchParms.get('page') || 1))
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
            return;
          }

          setRows(result.data);
          setTotalCount(result.totalCount);
          setIsload(false);
        });
    }
    
  }, [debouncedBusca, currentPage, tipo]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // Atualizar os parâmetros de pesquisa ou fazer outra ação necessária
    setSearchParams({ ...Object.fromEntries(searchParms.entries()), page: value.toString() }, { replace: true });
    setIsload(false);
  };

  return (
    <LayoutPaginas titulo="Área do Cliente">
      { (tipo !== 'Cadastrar') && (
        <FerramentaPesquisar textoDaBusca={busca} aoMudarTextoDaBusca={texto => setSearchParams({ ...Object.fromEntries(searchParms.entries()), busca: texto }, { replace: true })}/>
      )

      }
      <FerramentaNavegacao listaNavegacao={['Fisico', 'Juridico', 'Cadastrar']}/>
      { (tipo === 'Fisico') && (
        <FerramentaTabela cabecalho={['nome', 'cpf', 'email', 'telefone']} dados={rows}/>
      )
      }

      { (tipo === 'Juridico') && (
        <FerramentaTabela cabecalho={['nome', 'cnpj', 'email', 'telefone']} dados={rows}/>
      )
      }
      {
        (tipo !== 'Cadastrar') && (
          <Pagination
            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
            page={currentPage}
            onChange={handlePageChange}
          />
        )
      }

      { (isLoad && (tipo !== 'Cadastrar')) && (
        <LinearProgress/>
      )}

      { tipo === 'Cadastrar' && (
        <VFormCliente/>
      )

      }

    </LayoutPaginas>
  );
};
