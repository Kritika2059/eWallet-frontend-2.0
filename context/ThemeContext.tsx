import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface ThemeContextType {
  theme: { dark: boolean };
  setTheme: React.Dispatch<React.SetStateAction<{ dark: boolean }>>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: { dark: false },
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState({ dark: false });

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);