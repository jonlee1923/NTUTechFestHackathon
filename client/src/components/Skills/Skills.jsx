import React, { useState } from "react";

import { Container, Card, Row, Col } from "react-bootstrap";
import { Github, Journal, JournalAlbum } from "react-bootstrap-icons";
import { useHttpClient } from "../../hooks/httpHook";

import Profile from "../../pages/profilePage/profilePage";
import classes from "./Skills.module.css";

const Skills = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
                .then((response) => console.log(response));
        } catch (err) {}
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
                <button onClick={handleSubmit}>Test</button>
            </Row>
        </Container>
    );
};

export default Skills;
