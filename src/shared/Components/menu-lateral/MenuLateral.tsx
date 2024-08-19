import { Box, Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../../Contexts';
import { useLocation, useNavigate } from 'react-router';
import { Environment } from '../../Enviroment';
import { useMemo, useState } from 'react';

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
  const location = useLocation();

  const CaminhoUrlAtual = location.pathname;

  const isPaginaPDF = useMemo(() => {
    console.log(CaminhoUrlAtual);
    if (CaminhoUrlAtual.includes('pdf')){
      return true;
    }

    return false;
  }, []);

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown || isPaginaPDF ? 'temporary' : 'permanent'} className='menu-lateral'>
        <Box width={isPaginaPDF ? theme.spacing(0): theme.spacing(28)} display="flex" flexDirection="column" height="100%">
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

      <div style={{height: '100vh', marginLeft: smDown || isPaginaPDF ? 0 : theme.spacing(28)}} className='children-menu-lateral'>
        {children}
      </div>
    </>
  );
};
