import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";

import classes from "./Education.module.css";

const Education = (props) => {
  const randomtext =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
  // const education = {
  //   name: "Nanyang Technological University",
  //   course: "Biomedical Engineering",
  //   datestart: "Dec 2020",
  //   dateend: "Dec 2023",
  //   grade: "4.50",
  //   maxgrade: "5.00",
  //   description: randomtext,
  // };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useContext(AuthContext);
  const [educations, setEducations] = useState([]);
  let listedu = [];

  useEffect(() => {
    const fetchEducations = async () => {
      console.log(userId);
      let url = `http://localhost:5000/api/education/${userId}`;
      const response = await sendRequest(url);

      console.log("listedu", listedu);
      setEducations(response.educations);
      console.log("educations", educations);
    };
    fetchEducations();
  }, []);

  return (
    <Container className={classes.container}>
      {educations.map((education,i) => {
        return (
          <div key={i}>
            <p className={classes.title}>{education.name}</p>
            <p>{education.course}</p>
            <p>
              {education.datestart}-{education.dateend}
            </p>
            <p>
              Grade: {education.grade}/{education.maxgrade}
            </p>
          </div>
        );
      })}
    </Container>
  );
};

export default Education;
