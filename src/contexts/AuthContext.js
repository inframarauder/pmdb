import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({ user: null, isLoggedIn: false });

  const loginUser = (user) => {
    setAuth({ ...auth, user: user, isLoggedIn: true });
  };

  const logoutUser = () => {
    setAuth({ ...auth, user: null, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
