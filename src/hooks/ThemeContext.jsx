import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const getLocalStorageTheme = localStorage.getItem("data-theme");
  let themeValue = 'light';
  if (getLocalStorageTheme && (getLocalStorageTheme === "dark" || getLocalStorageTheme === "light")) {
    themeValue = getLocalStorageTheme;
  }

  const [theme, setTheme] = useState(themeValue);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};