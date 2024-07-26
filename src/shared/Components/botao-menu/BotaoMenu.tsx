import { Box, Icon, Paper, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';

interface IBotaoProps {
  texto: string,
  nomeIcone: string
  to: string
}

/*eslint-disable react/prop-types*/

export const BotaoMenu: React.FC<IBotaoProps> = ({
  texto,
  nomeIcone,
  to,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(to);
  };

  return (
    <Paper component={Box}
      width={theme.spacing(16)}
      height={theme.spacing(16)}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      onClick={handleClick}
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