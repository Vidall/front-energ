import React from 'react';
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';

interface ILayoutTabela {
  cabecalho: string[],
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  dados: Array<{ [key: string]: any }>
}

export const FerramentaTabela: React.FC<ILayoutTabela> = ({
  cabecalho,
  dados
}) => {
  const navigate = useNavigate();

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
                <TableCell onClick={() => navigate(`detalhe/${linha.id}`)}><Icon>search</Icon></TableCell>
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
