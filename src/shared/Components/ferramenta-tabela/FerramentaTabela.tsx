import React from 'react';
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';

interface ILayoutTabela {
  cabecalho: string[],
  /*eslint-disable @typescript-eslint/no-explicit-any*/

  /**
   * Dados que vão ser renderizados na tabela
   */
  dados: Array<{ [key: string]: any }>
  pagina: 'tecnicos' | 'clientes' | 'grupos_servicos' | 'ordens-de-servicos' 
}

export const FerramentaTabela: React.FC<ILayoutTabela> = ({
  cabecalho,
  dados,
  pagina
}) => {
  const navigate = useNavigate();
  const currentPage = (linha: {[key: string]: any}) => {
    if (pagina === 'clientes') {
      return navigate(`detalhe/${linha.id}?tipoPessoa=${linha.tipo}`);
    }
    if (pagina === 'grupos_servicos') {
      return navigate(`detalhe/${linha.id}`);
    }
    if (pagina === 'ordens-de-servicos') {
      return navigate(`start/${linha.id}`);
    }

    return navigate(`detalhe/${linha.id}`);

  };

  return (
    <TableContainer 
      component={Paper} 
      variant='outlined'
      sx={{
        margin: 1,
        width: 'auto'
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ações</TableCell>
            {
              cabecalho.map((cabecalhoItem, index) => (
                <TableCell key={index}>{cabecalhoItem}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            dados.map((linha, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell onClick={() => currentPage(linha)}><Icon>search</Icon></TableCell>
                {
                  cabecalho.map((coluna, colIndex) => (
                    <TableCell
                      key={colIndex}>
                      {linha[coluna]}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
