import { Box, Icon, Paper, Typography, useTheme } from '@mui/material';

interface IBotaoProps {
  texto: string,
  nomeIcone: string
}

/*eslint-disable react/prop-types*/

export const BotaoMenu: React.FC<IBotaoProps> = ({
  texto,
  nomeIcone
}) => {
  const theme = useTheme();

  return (
    <Paper component={Box}
      width={theme.spacing(16)}
      height={theme.spacing(16)}
      marginRight={5}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Box>
          <Icon sx={{
            fontSize: theme.spacing(8)
          }}> 
            {nomeIcone}
          </Icon>
        </Box>

        <Box>
          <Typography>
            {texto}
          </Typography>
        </Box>
      </Box>
    </Paper>

  );
};