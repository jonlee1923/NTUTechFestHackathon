import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import brand from "../../assets/TechLink.jpg";

import classes from "./footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footerdiv}>
      <Container className={classes.footercontainer}>
        <hr />
        <img src={brand} alt="brand" className={classes.brand} />
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
    </div>
  );
};

export default Footer;
