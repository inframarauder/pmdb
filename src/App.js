import React from "react";
import Header from "./components/Header";
import ThemeContextProvider from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <Header />
    </ThemeContextProvider>
  );
}

export default App;
