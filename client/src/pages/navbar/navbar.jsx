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
  return (
    <Navbar bg="light" expand="lg" className={classes.navbar}>
      <Container>
        <Navbar.Brand href="/">
          <img src={brandimg} alt="brand" className={classes.brandimg} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="/jobListings">Job-Listing</Nav.Link>
            <Nav.Link href="#link">Career Options</Nav.Link>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          {auth.isLoggedIn && (
            <NavDropdown className="ms-auto" title={<Person size={50} className={classes.profile}/> } id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{
                auth.logout();
              }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>

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
