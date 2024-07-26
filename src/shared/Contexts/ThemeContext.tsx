import { Box, ThemeProvider } from '@mui/material';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LightTheme } from '../Theme/Light';
import { DarkTheme } from '../Theme/Dark';

interface IThemeContext {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

interface IAppThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext({} as IThemeContext);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

/*eslint-disable react/prop-types*/
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{themeName, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default} sx={{
          margin: 0,
          padding: 0
        }}>
          { children }
        </Box>
      </ThemeProvider>

    </ThemeContext.Provider>

  );
};