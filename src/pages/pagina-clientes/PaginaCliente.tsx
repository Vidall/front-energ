import { BottomNavigation, BottomNavigationAction, Box, Button, Icon, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useState } from 'react';

import { LayoutPaginas } from '../../shared/Layout';

export const PaginaCliente: React.FC = () => {
  const [value, setValue] = useState(0);

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <LayoutPaginas titulo="Área do Cliente">
      <Box>
        <BottomNavigation
          showLabels
          value={value}  
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label={'Fisica'}/>
          <BottomNavigationAction label={'Juridica'}/>
          <BottomNavigationAction label={'Cadastrar'}/>
        </BottomNavigation>
      </Box>

      <Paper component={Box} display={'flex'} flexDirection={'row'}>
        <Box >
          <TextField id="outlined-basic" label="Pesquisar" variant="outlined" />  
        </Box>

        <Box flex={1} display={'flex'} justifyContent={'end'}>
          <Button variant='contained'>
            Buscar
          </Button>
        </Box>
      </Paper>

      <Paper component={Box} margin={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>                
                <TableCell></TableCell>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right" ><Icon>search</Icon></TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right" >{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Pagination count={10} />

    </LayoutPaginas>
  );
};

