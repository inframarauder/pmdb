import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState({ mode: "dark" });

  const toggleTheme = () => {
    switch (theme.mode) {
      case "dark":
        setTheme({ ...theme, mode: "light" });
        break;
      case "light":
        setTheme({ ...theme, mode: "dark" });
        break;
      default:
        setTheme({ ...theme });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
