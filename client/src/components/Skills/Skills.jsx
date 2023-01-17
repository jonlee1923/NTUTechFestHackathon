import React, { useState } from "react";

import { Container, Card, Row, Col } from "react-bootstrap";
import { Github, Journal, JournalAlbum } from "react-bootstrap-icons";
import { useHttpClient } from "../../hooks/httpHook";

import Profile from "../../pages/profilePage/profilePage";
import classes from "./Skills.module.css";

const Skills = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [jobListing, setJobListing] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [skills, setSkills] = useState("");

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    input: `${skills}`,
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    setRecommendation(response.prediction);
                    console.log(response);
                });


        } catch (err) {}
    };

    // const fetchJobs = async () => {
    //     let url = "http://localhost:5000/api/jobs";
    //     // fetch job listings
    //     const response = await sendRequest(url);
    //     // console.log(response);
    //     setJobListing(response.jobs);
    // };

    const skillsChange = (event) => {
        setSkills(event.target.value);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <a href={props.profile.github}>
                        <Github
                            size={40}
                            className={`${classes.git} ${classes.icon}`}
                        />
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
                <p></p>
                <p></p>
                <Card className={classes.sidecard} xs={4}>
                    <Card.Title>Please input your top 5 skills!</Card.Title>
                    <Card.Body>
                        <input value={skills} onChange={skillsChange}></input>
                        <button onClick={handleSubmit}>Recommend</button>
                    </Card.Body>
                    {recommendation && (
                        <Card.Title>{recommendation}</Card.Title>
                    )}
                </Card>
            </Row>
        </Container>
    );
};

export default Skills;
