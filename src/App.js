import React from "react";

//components
import { Header } from "./components/Layouts";
import Main from "./components/Main";

//contexts
import { MovieContextProvider, ThemeContextProvider } from "./contexts/";

function App() {
  return (
    <ThemeContextProvider>
      <Header />
      <MovieContextProvider>
        <Main />
      </MovieContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
