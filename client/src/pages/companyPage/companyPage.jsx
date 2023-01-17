import React from "react";
import { useState, useEffect } from "react";
import Job from "../renderJob/renderJob.jsx";
import { useHttpClient } from "../../hooks/httpHook";
import { Container, Form, Button, Pagination, Row, Col, Card } from "react-bootstrap";

import { BiSearchAlt2 } from "react-icons/bi";
import { CiLocationArrow1 } from "react-icons/ci";
import Image from 'react-bootstrap/Image'
import classes from "./companyPage.module.css";
import profilepic from "../../assets/companyLogo.jpg";
import { useNavigate } from "react-router-dom";

export default function CompanyProfile() {

    let navigate = useNavigate(); 
    const companyName = "DSO National Laboratories";
    const companyId = "63c57da4d6504a2a89afea4d"
    const makeJobListing = () => { 
        navigate("/createJobListings", {state:{companyName, companyId}});
    }
 
    const viewJobPostings = () => { 
        navigate("/companyListings", {state:{companyName, companyId}});
    }

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
            <Card.Body >
                <Card.Title className = {classes.divC}>
                    <div> 
                        <p className={classes.divA}> Company Name  </p>
                        <Card.Text className = {classes.cardText}> {companyName} </Card.Text>
                        &nbsp;     
                        <p className={classes.divA}> Business/Industry Type  </p>
                        <Card.Text className = {classes.cardText}> Research and Development </Card.Text>
                    </div>
                    <Image className={classes.image} src={profilepic} rounded />
                        
                    </Card.Title>

                <Card.Title>
                    <p className={classes.divA}> Company Vision  </p>
                </Card.Title>
                <Card.Text> To be a wellspring of technological knowledge, a fountain of innovation and an inspiration to the R&D community in Singapore. </Card.Text>
            </Card.Body>
          </Card>
          
          <div className={classes.buttonContainer}>
            <Button className={classes.button} onClick={viewJobPostings}> View job listings </Button>
            &nbsp;   
            <Button className={classes.button} onClick={makeJobListing}> Make job listing </Button>
          </div>
        </Container>
            
    );
};
