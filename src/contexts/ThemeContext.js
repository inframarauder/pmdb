import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState({
    mode: localStorage.getItem("mode") || "dark",
  });

  const toggleTheme = () => {
    switch (theme.mode) {
      case "dark":
        localStorage.setItem("mode", "light");
        setTheme({ ...theme, mode: localStorage.getItem("mode") });
        break;
      case "light":
        localStorage.setItem("mode", "dark");
        setTheme({ ...theme, mode: localStorage.getItem("mode") });
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
