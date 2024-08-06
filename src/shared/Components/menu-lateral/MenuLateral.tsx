import { Box, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../../Contexts';
import { useNavigate } from 'react-router';

interface IMenuLateralProps {
  children: React.ReactNode
}

/*eslint-disable react/prop-types*/
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();
  const navigate = useNavigate();
  const {toggleTheme} = useAppThemeContext();

  return (

    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
        <Box width={theme.spacing(28)}>
          <List>            
            <ListItem >               
              <ListItemButton>
                <ListItemIcon onClick={() => navigate('/inicio')}>
                  <Icon>
                    house
                  </Icon>
                  <ListItemText primary={'Inicio'}/>
                </ListItemIcon>                
              </ListItemButton>              
            </ListItem>

            <ListItem >               
              <ListItemButton>
                <ListItemIcon onClick={toggleTheme}>
                  <Icon>
                    tema
                  </Icon>
                  <ListItemText primary={'Inicio'}/>
                </ListItemIcon>                
              </ListItemButton>              
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box height={'100vh'} marginLeft={smDown ? theme.spacing(0) : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

