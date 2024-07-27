import { Box, Paper, TextField } from '@mui/material';

/*eslint-disable no-unused-vars*/
/*eslint-disable react/prop-types*/

interface IFerramentaPesquisar {
  textoDaBusca: string,
  aoMudarTextoDaBusca?: (novoTexto: string) => void
}

/*eslint-disable no-undef*/
export const FerramentaPesquisar:React.FC<IFerramentaPesquisar> = ({
  textoDaBusca='',
  aoMudarTextoDaBusca
}) => {
  return (
    <Paper component={Box} display={'flex'} flexDirection={'row'}>
      <Box >
        <TextField id="outlined-basic" label="Pesquisar" variant="outlined" 
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)}
          size='small'
        />  
      </Box>
    </Paper>
  );
};