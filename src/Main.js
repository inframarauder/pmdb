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

const Main = () => {
  const { loginUser, logoutUser } = useContext(AuthContext);

  useEffect(
    () => {
      (() => {
        try {
          //set theme:
          let mode = localStorage.getItem("mode");
          if (!mode) {
            localStorage.setItem("mode", "dark");
          }
          //check for logged in users
          let accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            logoutUser();
          } else {
            const user = JSON.parse(localStorage.getItem("user"));
            loginUser(user);
          }
        } catch (error) {
          console.error(error);
          toast.error("Error in fetching user,please login again!");
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
            <Route exact path="/login" component={Auth} />
            <ReviewContextProvider>
              <Route exact path="/reviews/movie/:id" component={Reviews} />
            </ReviewContextProvider>
            <Route component={NotFound} />
          </Switch>
        </MovieContextProvider>
      </ThemeContextProvider>
    </Router>
  );
};

export default Main;
