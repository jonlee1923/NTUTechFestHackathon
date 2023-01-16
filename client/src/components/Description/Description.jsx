import React from "react";
import { Container } from "react-bootstrap";
import classes from "./Description.module.css";

const Description = (props) => {
  return (
    <Container className={classes.container}>
      {props.profile && <p>{props.profile.desc}</p>}
      {!props.profile && <p>-</p>}
    </Container>
  );
};

export default Description;
