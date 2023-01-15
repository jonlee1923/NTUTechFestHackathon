import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

import classes from "./footer.module.css";

const Footer = () => {
  return (
    <Container >
    <hr/>
      <Container className={classes.footer}>
        <Row>
          <Col>
            <a href="#">About</a>
          </Col>
          <Col>
            <a href="#">Contact Us</a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
