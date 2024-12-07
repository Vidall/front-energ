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

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Verifica se o evento é do tipo correto
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      beforeInstallEvent.preventDefault(); // Evita o banner padrão
      setDeferredPrompt(beforeInstallEvent); // Armazena o evento
      setShowInstallBanner(true); // Exibe o banner personalizado
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Mostra o prompt de instalação
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }
        setDeferredPrompt(null); // Limpa o evento armazenado
        setShowInstallBanner(false); // Esconde o banner
      });
    }
  };

  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            {/* Exibe o banner de instalação se necessário */}
            {(showInstallBanner) && (
              <div className={classes.installApp}>
                <div className={classes.installAppFilho}>
                  <div>
                    <p>Deseja instalar o aplicativo?</p>
                  </div>
                  <Divider/>
                  <div className={classes.actions}>
                    <div> 
                      <Button variant='text' onClick={() => setShowInstallBanner(false)}>Não</Button>
                    </div>
                    <div>
                      <Button variant='contained' onClick={handleInstallClick}>Instalar</Button>
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
