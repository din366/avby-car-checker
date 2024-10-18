import {useLayoutEffect, useState} from "react";

export const useTheme = () => {
  const getLocalStorageTheme = localStorage.getItem("data-theme");
  let themeValue = false;

  if (getLocalStorageTheme && (getLocalStorageTheme === "dark" || getLocalStorageTheme === "light")) {
    themeValue = getLocalStorageTheme;
  }

  const [theme, setTheme] = useState(themeValue || 'light');
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("data-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}