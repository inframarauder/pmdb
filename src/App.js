import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

import ThemeContextProvider from "./contexts/ThemeContext";
import MovieContextProvider from "./contexts/MovieContext";

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
