import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider } from './shared/Contexts/ThemeContext';
import { DrawerProvider } from './shared/Contexts';
import { MenuLateral } from './shared/Components';
import { AppRoutes } from './routes';

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
