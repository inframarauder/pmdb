import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import ThemeToggler from "./ThemeToggler";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Navbar bg={theme.mode} expand="lg" variant={theme.mode} fixed="top">
      <Navbar.Brand href="/">Public Movie Database</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-4">
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <ThemeToggler />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
