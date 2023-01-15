import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

import classes from "./Education.module.css";

const Education = () => {
  const randomtext =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
  const basketball = {
    title: "Basketball",
    position: "member",
    description: randomtext,
  };
  const education = {
    name: "Nanyang Technological University",
    course: "Biomedical Engineering",
    datestart: "Dec 2020",
    dateend: "Dec 2023",
    grade: "4.50",
    maxgrade: "5.00",
    extracurriculum: [basketball],
    description: randomtext,
  };
  return (
    <Container className={classes.container}>
      <p className={classes.title}>{education.name}</p>
      <p>{education.course}</p>
      <p>
        Grade: {education.grade}/{education.maxgrade}
      </p>
      <p>Activities:</p>
      <ol>
        {education.extracurriculum.map((activity) => (
          <li>
            <p>{activity.title}</p>
            <p>Position: {activity.position}</p>
            <p>{activity.description}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
};

export default Education;
