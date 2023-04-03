import { PaletteMode } from '@mui/material';

const lightMode: PaletteMode = 'light';
const darkMode: PaletteMode = 'dark';

export const light = {
  palette: {
    type: lightMode,
    primary: {
      main: '#6b6b6b'
    },
    secondary: {
      main: '#f50057'
    },
    background: {
      default: '#efefef',
      paper: '#fdfdfd'
    }
  }
};

export const dark = {
  palette: {
    mode: darkMode
  }
};
