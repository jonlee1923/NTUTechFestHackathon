import React from "react";
import classes from "./PersonalDetails.module.css";

import { Container, Card } from "react-bootstrap";

const PersonalDetails = (props) => {
  return (
    <Container className={props.className}>
      {props.profile && (
        <Card className={classes.card}>
          <h6 className={classes.title}>
            Name: <span className={classes.content}>{props.profile.name}</span>
          </h6>
          <h6 className={classes.title}>
            Age: <span className={classes.content}>{props.profile.age}</span>
          </h6>
        </Card>
      )}
    </Container>
  );
};

export default PersonalDetails;
