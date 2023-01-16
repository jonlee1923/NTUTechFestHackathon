import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";
import classes from "./Experience.module.css";

const Experience = () => {
  const randomtext =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  const [experiences, setExperiences] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    const fetchExperience = async () => {
      console.log(userId);
      let url = `http://localhost:5000/api/experience/getExp/${userId}`;
      const response = await sendRequest(url);
      console.log(response);
      setExperiences(response.experiences);
      console.log("experiences", experiences);
    };
    fetchExperience();
  }, []);
  // const experience = {
  //   name: "Shopee",
  //   position: "Software Engineer",
  //   datestart: "Dec 2020",
  //   dateend: "Dec 2023",
  //   country: "Singapore",
  //   description: randomtext,
  // };
  console.log("experiences",experiences);
  return (
    <Container className={classes.container}>
      {experiences.map((experience,i) => {
        return (
          <div key={i}>
            <p className={classes.title}>{experience.name}</p>
            <p>{experience.position}</p>
            <p>{experience.country}</p>
            <p>
              {experience.datestart}-{experience.dateend}
            </p>
            <p>{experience.description}</p>
          </div>
        );
      })}
    </Container>
  );
};

export default Experience;
