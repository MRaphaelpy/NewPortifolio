import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext(null);

// O index.html aplica o tema salvo antes do React carregar (evita o
// "flash" do tema errado); aqui só lemos o valor que ele já definiu.
const getInitialTheme = () => document.documentElement.dataset.theme ?? "dark";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Armazenamento indisponível (aba anônima, cookies bloqueados).
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components -- hook pareado com o provider
export const useTheme = () => useContext(ThemeContext);
