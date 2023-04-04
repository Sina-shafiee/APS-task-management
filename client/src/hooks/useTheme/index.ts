import { useContext } from 'react';

import { themeContext } from '../../theme';

export const useTheme = () => {
  const theme = useContext(themeContext);

  return theme;
};
