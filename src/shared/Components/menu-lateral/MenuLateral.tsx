import { Box, Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../../Contexts';
import { useNavigate } from 'react-router';
import { Environment } from '../../Enviroment';

interface IMenuLateralProps {
  children: React.ReactNode
}

/*eslint-disable react/prop-types*/
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const navigate = useNavigate();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
        <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate(Environment.CAMINHO_INICIO)}>
                <ListItemIcon>
                  <Icon>house</Icon>
                </ListItemIcon>
                <ListItemText primary={'Inicio'} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/clientes?tipo=Fisico')}>
                <ListItemIcon>
                  <Icon>people</Icon>
                </ListItemIcon>
                <ListItemText primary={'Clientes'} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate(`${Environment.CAMINHO_TECNICOS}?tipo=Todos`)}>
                <ListItemIcon>
                  <Icon>engineering</Icon>
                </ListItemIcon>
                <ListItemText primary={'Tecnicos'} />
              </ListItemButton>
            </ListItem>
          </List>

          <Box flexGrow={1} /> {/* Este Box irá ocupar o espaço disponível */}
          <List>
            <ListItem>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>contrast</Icon>
                </ListItemIcon>
                <ListItemText primary={'Tema'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};