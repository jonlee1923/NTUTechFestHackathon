import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import EditPencil from "../../components/EditPencil/EditPencil";

import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";

import classes from "./editEducationList.module.css";

const EditEducationList = () => {
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
      <Container>
        <h4 className={classes.title}>Education List</h4>
        {educations.length === 0 && <h5>No Data</h5>}
        {educations.length !== 0 && (
          <Container className={classes.container}>
            {educations.map((education, i) => {
              return (
                <Card key={i} className={classes.card}>
                <EditPencil className={classes.editbtn} href={`/editedu/${education.id}`}/>
                  <p className={classes.title}>{education.name}</p>
                  <p>{education.course}</p>
                  <p>
                    {education.datestart}-{education.dateend}
                  </p>
                  <p>
                    Grade: {education.grade}/{education.maxgrade}
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

export default EditEducationList;