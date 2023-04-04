import { createContext, PropsWithChildren, useState } from 'react';

export const themeContext = createContext({
  toggleTheme: () => {},
  isDark: true
});

export const CustomThemeWrapper = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <themeContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </themeContext.Provider>
  );
};
