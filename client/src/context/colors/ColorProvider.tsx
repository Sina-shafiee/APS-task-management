import { createContext, PropsWithChildren, useState } from 'react';

export const colorContext = createContext({
  toggleTheme: () => {},
  isDark: true
});

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <colorContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </colorContext.Provider>
  );
};
