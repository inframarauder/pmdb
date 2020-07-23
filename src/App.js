import React, { useEffect, useContext } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import { Header, NotFound } from "./components/Layouts";
import { Reviews } from "./components/Movies";
import Main from "./components/Main";

//contexts
import {
  MovieContextProvider,
  ThemeContextProvider,
  ReviewContextProvider,
  AuthContextProvider,
} from "./contexts/";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <ThemeContextProvider>
          <Header />
          <MovieContextProvider>
            <Switch>
              <Route exact path="/" component={Main} />
              <ReviewContextProvider>
                <Route exact path="/reviews/movie/:id" component={Reviews} />
              </ReviewContextProvider>
              <Route component={NotFound} />
            </Switch>
          </MovieContextProvider>
        </ThemeContextProvider>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
