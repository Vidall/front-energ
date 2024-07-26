import { Box, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../../Contexts';

interface IMenuLateralProps {
  children: React.ReactNode
}

/*eslint-disable react/prop-types*/
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();

  return (

    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
        <Box width={theme.spacing(28)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>
                    people
                  </Icon>
                  <ListItemText primary={'ola'}/>
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

