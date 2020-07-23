import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//components
import { Header, NotFound } from "./components/Layouts";
import { Auth, Movies, Reviews } from "./containers";

//contexts
import {
  MovieContextProvider,
  ThemeContextProvider,
  ReviewContextProvider,
  AuthContext,
} from "./contexts/";

import Api from "./Api";

const Main = () => {
  const { loginUser, logoutUser } = useContext(AuthContext);
  useEffect(
    () => {
      (async () => {
        try {
          let accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            logoutUser();
          } else {
            const res = await Api.loadUser();
            loginUser(res.data);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.error);
        }
      })();
    }, // eslint-disable-next-line
    []
  );
  return (
    <Router>
      <ThemeContextProvider>
        <ToastContainer />
        <Header />
        <MovieContextProvider>
          <Switch>
            <Route exact path="/" component={Movies} />
            <ReviewContextProvider>
              <Route exact path="/reviews/movie/:id" component={Reviews} />
              <Route exact path="/login" component={Auth} />
            </ReviewContextProvider>
            <Route component={NotFound} />
          </Switch>
        </MovieContextProvider>
      </ThemeContextProvider>
    </Router>
  );
};

export default Main;
