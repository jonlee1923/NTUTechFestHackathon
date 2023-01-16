import React from "react";

import { Container, Card, Row, Col } from "react-bootstrap";
import { Github, Journal, JournalAlbum } from "react-bootstrap-icons";

import Profile from "../../pages/profilePage/profilePage";
import classes from "./Interests.module.css";
const Interests = (props) => {
  const interests = [
    "Basketball",
    "Cooking",
    "Studying",
    "Programming",
    "Volunteering",
  ];
  return (
    <Container>
      <Row>
        {interests.map((interest) => {
          return (
            <Col xs={6}>
              <p>{interest}</p>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Interests;
