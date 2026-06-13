import React, {
  createContext,
  useState
} from "react";

export const ThemeContext =
  createContext<any>(null);

export function ThemeProvider({
  children
}: any) {
  const [theme, setTheme] =
    useState("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}