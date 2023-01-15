import React from "react";

import { Container, Card, Row, Col } from "react-bootstrap";
import { Github, Journal, JournalAlbum } from "react-bootstrap-icons";

import Profile from "../../pages/profilePage/profilePage";
import classes from "./LinkDetails.module.css";
const LinkDetails = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <a href={props.profile.github}>
            <Github size={40} className={`${classes.git} ${classes.icon}`} />
          </a>
        </Col>
        <Col>
          <a href={props.profile.portfolio}>
            <JournalAlbum
              className={`${classes.portfolio} ${classes.icon}`}
              size={40}
            />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default LinkDetails;
