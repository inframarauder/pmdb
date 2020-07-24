import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext } from "../contexts";
import { Spinner } from "../components/Layouts";
import Api from "../Api";

const Auth = () => {
  const { theme } = useContext(ThemeContext);

  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = e.target.name;
    try {
      let res;
      let body = { username: state.username, password: state.password };
      setState({ ...state, loading: true });
      switch (event) {
        case "Login":
          res = await Api.login(body);
          break;
        case "Signup":
          res = await Api.signup(body);
          break;
        default:
          alert("Invalid!");
      }

      let { accessToken, refreshToken, user } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      setState({ ...state, loading: false });
      toast.success(`${event} Successful`);

      setTimeout(() => (window.location.href = "/"), 500);
    } catch (error) {
      console.error(error.response);
      toast.error(error.response.data.error);
      setState({ ...state, loading: false });
    }
  };

  return (
    <div className={`${theme.mode} login-area`}>
      <ToastContainer />
      <legend className="text-center">
        Login / Signup to post reviews for movies:
      </legend>
      {state.loading ? (
        <Spinner />
      ) : (
        <Form className="login-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={state.username}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            name="Login"
            className="submit-btn"
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </Button>

          <Button
            variant="primary"
            type="submit"
            name="Signup"
            className="submit-btn"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Auth;
