import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from "./fullJobInformation.module.css";
import {FiMapPin} from "react-icons/fi";

function JobDescription() {
    
    const role = 'Programmer'
    const company = 'Amazon'
    const link = 'https://github.com'
    const description = 'Programming for hackatons' 
    const location = 'Singapore'

    return (
        <div className={classes.fullJobDescription}>
          <Card className={classes.card}>
            <Card.Body>
              <div className={classes.jobRoleLoc}> 
                <div> 
                  <Card.Title >Company</Card.Title>
                  <Card.Text>{company} {''} </Card.Text>
                </div>
                <Button className = {classes.visitCompany} href={link}>Visit them</Button> 
              </div> 
              &nbsp;
              <div className={classes.jobRoleLoc}> 
                <div>
                  <Card.Title>Job Role</Card.Title>
                  <Card.Text>{role}</Card.Text>
                </div>
                <div className={classes.jobLoc}>
                  <Card.Title>Job Location</Card.Title>
                  <div className={classes.loc}> 
                    <FiMapPin/>  &nbsp; 
                    <Card.Text> {location}</Card.Text> 
                  </div>
                </div> 
              </div> 
              &nbsp;
              <Card.Title>Job Description</Card.Title>
              <Card.Text>{description}</Card.Text>    
            </Card.Body>
          </Card>             
        </div>
    );
}

export default JobDescription;
