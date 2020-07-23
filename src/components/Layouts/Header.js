import React, { useEffect, useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ThemeToggler from "./ThemeToggler";
import { ThemeContext, AuthContext } from "../../contexts";
import axios from "axios";
import { BASE_URL } from "../../configs";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post(`${BASE_URL}/auth/refresh_token`, {
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("refreshToken", res.data.refreshToken);
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { auth, loginUser, logoutUser } = useContext(AuthContext);

  useEffect(
    () => {
      (async () => {
        try {
          let accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            logoutUser();
          } else {
            const res = await axios.get(`${BASE_URL}/user`, {
              headers: { "x-auth-token": accessToken },
            });
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

  const handleLogout = async () => {
    try {
      await axios.delete(`${BASE_URL}/auth/logout`, {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  return (
    <Navbar bg={theme.mode} expand="lg" variant={theme.mode} fixed="top">
      <ToastContainer />
      <Navbar.Brand href="/">Public Movie Database</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-4">
          {auth.isLoggedIn ? (
            <Nav.Link>
              <span className="greet">Hi,{auth.user.username}</span>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
        <ThemeToggler />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
