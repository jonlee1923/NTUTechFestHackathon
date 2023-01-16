import React from "react";

import { Container, Card, Row, Col } from "react-bootstrap";
import { Github, Journal, JournalAlbum } from "react-bootstrap-icons";
import { useHttpClient } from "../../hooks/httpHook";

import Profile from "../../pages/profilePage/profilePage";
import classes from "./Skills.module.css";

const Skills = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleSubmit = async (event) => {
        try {

            event.preventDefault();
            // Send a request to the server with the email and password
            let url = "http://localhost:8000/predict";
            let method = "POST";
            let body = JSON.stringify({
                input: "testing java hadoop ruby scala",
            });
            let headers = {
                "Content-Type": "application/json",
            };

            headers.append(
                "Access-Control-Allow-Origin",
                "http://localhost:3000"
            );
            console.log("hi")

            console.log("clicked")
            const response = await sendRequest(url, method, body, headers);
            console.log(response);
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
