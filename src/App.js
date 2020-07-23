import React from "react";
import Main from "./Main";
import { AuthContextProvider } from "./contexts/";

function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}

export default App;
