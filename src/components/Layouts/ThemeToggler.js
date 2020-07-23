import React, { useContext } from "react";
import { ThemeContext } from "../../contexts";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} className={`theme-toggler-btn ${theme.mode}`}>
      <i className="fa fa-moon-o"></i>
    </button>
  );
};

export default ThemeToggler;
