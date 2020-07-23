import React, { useEffect, useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ThemeToggler from "./ThemeToggler";
import { ThemeContext, AuthContext } from "../../contexts";
import Api from "../../Api";

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
            const res = await Api.loadtUser();
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
      await Api.logout();
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
