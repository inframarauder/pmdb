import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import { Header, NotFound } from "./components/Layouts";
import { Reviews } from "./components/Movies";
import Main from "./components/Main";

//contexts
import { MovieContextProvider, ThemeContextProvider } from "./contexts/";

function App() {
  return (
    <Router>
      <ThemeContextProvider>
        <Header />
        <MovieContextProvider>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/reviews/movie/:id" component={Reviews} />
            <Route component={NotFound} />
          </Switch>
        </MovieContextProvider>
      </ThemeContextProvider>
    </Router>
  );
}

export default App;
