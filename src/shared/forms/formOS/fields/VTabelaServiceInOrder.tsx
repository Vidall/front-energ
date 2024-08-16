import React from 'react';
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';

interface ILayoutTabela {
  cabecalho: { [key: string]: string },
  /*eslint-disable @typescript-eslint/no-explicit-any*/

  /**
   * Dados que vão ser renderizados na tabela
   */
  dados: Array<{ [key: string]: any }>
  pagina: 'tecnicos' | 'clientes' | 'grupos_servicos' | 'ordens-de-servicos' 
}

export const VTabelaServiceInOrder: React.FC<ILayoutTabela> = ({
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
      return navigate(`/ordens-de-servicos/detalhe/andamento/${linha.id}`);
    }

    return navigate(`detalhe/${linha.id}`);
  };

  // Função para acessar valores aninhados
  const getNestedValue = (obj: {[key: string]: any}, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
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
              // Use Object.keys para iterar sobre as chaves personalizadas
              Object.keys(cabecalho).map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
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
                  // Use o valor do mapeamento para acessar a propriedade correta
                  Object.values(cabecalho).map((path, colIndex) => (
                    <TableCell key={colIndex}>
                      {String(getNestedValue(linha, path)) || 'N/A'}
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
