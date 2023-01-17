import React from "react";
import { Container } from "react-bootstrap";
const Description = (props) => {
  return (
    <Container>{props.profile && <div>{props.profile.desc}</div>}</Container>
  );
};

export default Description;
