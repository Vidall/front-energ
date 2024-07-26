import { createTheme } from '@mui/material';
import { cyan, purple } from '@mui/material/colors';

export const DarkTheme = createTheme({
  
  palette: {
    mode: 'dark',
    primary: {
      main: purple[700],
      dark: purple[800],
      light: purple[500],
      contrastText: '#fffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff'
    },
    background: {
      paper: '#303134',
      default: '#202124'
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  } 
});