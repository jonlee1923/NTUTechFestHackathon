import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../hooks/httpHook";
import classes from "./login.module.css";
import Button from "react-bootstrap/Button";
import { Form, Card, Container, Row, Col } from "react-bootstrap";
import choices from "../../assets/choices.jpg";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [show, setShow] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
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
      auth.login(response._id, response.token);
      navigate("/");      
    } catch (err) {}
  };

  return (
    <Container>
      <Row className={classes.row}>
        <Col xs={5}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="lg"
                type="email"
                placeholder="Enter Email"
                onChange={handleEmailChange}
                className={classes.input}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                className={classes.input}
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Login
            </Button>
          </form>
        </Col>
        <Col xs={7}>
          <img src={choices} alt="choices" className={classes.img} />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
