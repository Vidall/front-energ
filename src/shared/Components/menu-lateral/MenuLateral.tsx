import { Box, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../../Contexts';
import { useNavigate } from 'react-router';
import { Environment } from '../../Enviroment';
import { useEffect, useState } from 'react';

interface IMenuLateralProps {
  children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const navigate = useNavigate();
  const {toggleTheme} = useAppThemeContext();
  const [isLogin, setIsLogin] = useState(false);

  const handleClick = (caminho: string) => {
    navigate(caminho);
    toggleDrawerOpen();
  };

  useEffect(() => {
    if (window.location.href.includes('entrar')) {
      setIsLogin(true);
    }

  });

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} className='menu-lateral'>
        <Box width={isLogin ? theme.spacing(0) : theme.spacing(28)} display="flex" flexDirection="column" height="100%">
          <List>
            <ListItem>
              <ListItemButton onClick={() => handleClick('/inicio')}>
                <ListItemIcon>
                  <Icon>house</Icon>
                </ListItemIcon>
                <ListItemText primary={'Inicio'} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={() => handleClick('/clientes?tipo=Fisico')}>
                <ListItemIcon>
                  <Icon>people</Icon>
                </ListItemIcon>
                <ListItemText primary={'Clientes'} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={() => handleClick('/tecnicos?tipo=Todos')}>
                <ListItemIcon>
                  <Icon>engineering</Icon>
                </ListItemIcon>
                <ListItemText primary={'Tecnicos'} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={() => handleClick('/servicos?tipo=Todos&grupo=1')}>
                <ListItemIcon>
                  <Icon>build</Icon>
                </ListItemIcon>
                <ListItemText primary={'Serviços'} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={() => handleClick('/ordens-de-servicos?tipo=Todos')}>
                <ListItemIcon>
                  <Icon>miscellaneous_services</Icon>
                </ListItemIcon>
                <ListItemText primary={'Os'} />
              </ListItemButton>
            </ListItem>
          </List>

          <Box flexGrow={1} /> {/* Este Box irá ocupar o espaço disponível */}
          <List>
            {/* <ListItem>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>contrast</Icon>
                </ListItemIcon>
                <ListItemText primary={'Tema'} />
              </ListItemButton>
            </ListItem> */}
          </List>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown || isLogin ? theme.spacing(0) : theme.spacing(28)} component={Paper} className='children-menu-lateral'>
        {children}
      </Box>
    </>
  );
};