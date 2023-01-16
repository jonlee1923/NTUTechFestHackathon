import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../hooks/httpHook";
import loginStyle from "./login.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Login() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (isLoginMode) {
      try {
        event.preventDefault();
        // Send a request to the server with the email and password
        let url = "http://localhost:5000/api/users/login";
        let method = "POST";
        let body = JSON.stringify({
          email: email,
          password: password,
        });
        let headers = {
          "Content-Type": "application/json",
        };

        const response = await sendRequest(url, method, body, headers);
        // console.log("id", response);
        auth.login(response._id, response.token);

        console.log(response);
      } catch (err) {}
    } else {
      try {
        event.preventDefault();

        let body = JSON.stringify({
          name: name,
          email: email,
          password: password,
        });
        let headers = {
          "Content-Type": "application/json",
        };
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          body,
          headers
        );

        if (password !== confirmPassword) {
          handleShow();

          console.log("Passwords do not match");
        } else {
          auth.login(responseData.userId, responseData.token);
        }
        console.log("before login");
      } catch (err) {}
    }
  };

  const handleModeclick = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className={loginStyle.loginContainer}>
      <form onSubmit={handleSubmit}>
        <label hidden={isLoginMode}>
          Name:
          <input type="name" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label hidden={isLoginMode}>
          Confirm Password:
          <input
            type="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </label>
        <Button className={loginStyle.buttons} type="submit">
          {" "}
          {isLoginMode ? "Login" : "Submit"}{" "}
        </Button>
      </form>

      <br></br>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Passwords entered do not match!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please re-enter the passwords again! Click 'Understood' or the 'X"
          located at the top right to dismiss this message.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <Button
          className={loginStyle.buttons}
          onClick={() => {
            handleModeclick();
          }}
        >
          {isLoginMode ? "Sign up" : "Login"}
        </Button>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
