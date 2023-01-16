import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import EditPencil from "../../components/EditPencil/EditPencil";

import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";

import classes from "./editExperienceList.module.css";

const EditExperienceList = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { userId } = useContext(AuthContext);
    const [experiences, setExperiences] = useState([]);
    let listedu = [];
  
    useEffect(() => {
      const fetchExperiences = async () => {
        console.log(userId);
        let url = `http://localhost:5000/api/experience/getExp/${userId}`;
        const response = await sendRequest(url);
  
        console.log("listedu", listedu);
        setExperiences(response.experiences);
        console.log("experiences", experiences);
      };
      fetchExperiences();
    }, []);
    // const experience = {
  //   name: "Shopee",
  //   position: "Software Engineer",
  //   datestart: "Dec 2020",
  //   dateend: "Dec 2023",
  //   country: "Singapore",
  //   description: randomtext,
  // };
    return (
      <Container>
        <h4 className={classes.title}>Experiences List</h4>
        {experiences.length === 0 && <h5>No Data</h5>}
        {experiences.length !== 0 && (
          <Container className={classes.container}>
            {experiences.map((experience, i) => {
              return (
                <Card key={i} className={classes.card}>
                <EditPencil className={classes.editbtn} href={`/editexp/${experience.id}`}/>
                  <p className={classes.title}>{experience.name}</p>
                  <p>{experience.position}</p>
                  <p>{experience.country}</p>
                  <p>
                    {experience.datestart}-{experience.dateend}
                  </p>
                  <p>
                    {experience.description}
                  </p>
                  <hr/>
                </Card>
              );
            })}
          </Container>
        )}
      </Container>
    );
  };

export default EditExperienceList;