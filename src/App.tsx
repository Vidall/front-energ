import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider } from './shared/Contexts/ThemeContext';
import { DrawerProvider } from './shared/Contexts';
import { MenuLateral } from './shared/Components';
import { AppRoutes } from './routes';
import { Button, Divider } from '@mui/material';

import classes from './App.module.css';

// Tipo do evento `beforeinstallprompt`
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const pathURL = window.location.pathname; 

  useEffect(() => {
    if (pathURL === '/entrar') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    // Verifica no sessionStorage se o usuário já recusou o banner
    const hasDismissedBanner = sessionStorage.getItem('dismissedInstallBanner') === 'true';
    if (hasDismissedBanner) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      beforeInstallEvent.preventDefault();
      setDeferredPrompt(beforeInstallEvent);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      });
    }
  };

  const handleClickNotInstall = () => {
    setDeferredPrompt(null);
    setShowInstallBanner(false);
    sessionStorage.setItem('dismissedInstallBanner', 'true'); // Salva a escolha no sessionStorage
  };

  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            {(showInstallBanner && !isLogin) && (
              <div className={classes.installApp}>
                <div className={classes.installAppFilho}>
                  <div>
                    <p>Deseja instalar o aplicativo?</p>
                  </div>
                  <Divider />
                  <div className={classes.actions}>
                    <div>
                      <Button variant="text" onClick={handleClickNotInstall}>
                        Não
                      </Button>
                    </div>
                    <div>
                      <Button variant="contained" onClick={handleInstallClick}>
                        Instalar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
