import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import brandimg from "../../assets/TechLink.jpg";
import classes from "./navbar.module.css";
import { AuthContext } from "../../context/authContext";

function AppNavbar() {
  const auth = useContext(AuthContext);
  console.log(auth.isLoggedIn);
  return (
    <Navbar bg="light" expand="lg" className={classes.navbar}>
      <Container>
        <Navbar.Brand href="/">
          <img src={brandimg} alt="brand" className={classes.brandimg} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="/job-listings">Job-Listing</Nav.Link>
            <Nav.Link href="#link">Career Options</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          {auth.isLoggedIn && (
            <Nav.Link className="ms-auto" href="/profile">
              <Person size={40} className={classes.profile} />
            </Nav.Link>
          )}
          {!auth.isLoggedIn && (
            <div className={classes.loginbtn}>
              <a href="/signup">
                <Button variant="outline-primary">Signup</Button>
              </a>
              <a href="/login">
                <Button variant="outline-primary">Login</Button>
              </a>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
