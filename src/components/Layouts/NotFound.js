import React, { useContext } from "react";
import { ThemeContext } from "../../contexts";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme.mode} not-found`}>
      <p className="display-1 text-center">404</p>
      <p className="text-center">Page Not Found :(</p>
    </div>
  );
};

export default NotFound;
