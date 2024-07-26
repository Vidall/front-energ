import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/Contexts/ThemeContext';
import { DrawerProvider } from './shared/Contexts';
import { MenuLateral } from './shared/Components/menu-lateral/MenuLateral';

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes/>
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>      
    </AppThemeProvider>
  );
}

export default App;
