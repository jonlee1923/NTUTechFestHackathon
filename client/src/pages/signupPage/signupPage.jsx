import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../hooks/httpHook";
import classes from "./signupPage.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Container, Row, Col } from "react-bootstrap";
import choices from "../../assets/choices.jpg";


function Signup() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUserMode, setIsUserMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [apiMode, setApiMode] = useState('users')

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

  const handleUserModeclick = () => {
    setIsUserMode(!isUserMode);
    console.log(isUserMode);
    if (isUserMode) {
      setApiMode('users')
    }
    else{
      setApiMode('company')
    }
    console.log('api mode is '+apiMode)
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log('api mode in' + apiMode);
      if (password !== confirmPassword) {
        handleShow();

        console.log("Passwords do not match");
      } else {
      let body = JSON.stringify({
        name: name,
        email: email,
        password: password,
      });
      let headers = {
        "Content-Type": "application/json",
      };
      const responseData = await sendRequest(
        `http://localhost:5000/api/${apiMode}/signup`,
        "POST",
        body,
        headers
      );
        auth.login(responseData._id, responseData.token);
        console.log(responseData)
      }
      console.log("before login");
    } catch (err) {}
  };

  return (
    <Container>
      <Row className={classes.row}>
        <Col xs={5}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Name"
                onChange={handleNameChange}
                className={classes.input}
              />
            </Form.Group>
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
                placeholder="Enter Password"
                onChange={handlePasswordChange}
                className={classes.input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                placeholder="Confirm Password"
                onChange={handleConfirmPasswordChange}
                className={classes.input}
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Signup
            </Button>
            &nbsp;
            <Button
              variant="secondary"
                onClick={() => {
                handleUserModeclick();
                }} 
                >
              {isUserMode ? "Signup as company" : "Signup as user"}
            </Button>
            

          </form>
        </Col>
        <Col xs={7}>
          <img src={choices} alt="choices" className={classes.img} />
        </Col>
      </Row>
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
    </Container>
  );
}

export default Signup;
