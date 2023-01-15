import React, { useState, useContext } from "react";
import { useHttpClient } from "../hooks/httpHook";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from "../fullJobInformation.module.css";

function JobDescription() {
    
    const role = 'Programmer'
    const company = 'Amazon'
    const link = 'https://github.com'
    const description = 'Programming for hackatons' 
    
    // GET data

    // const useJobInfo = async () => {
    //     const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    //     let url = "http://localhost:5000/api/jobs";
    
    //     const response = await sendRequest(url);
        
    //     console.log(response)
    //     return response
    // };
    // useJobInfo()

    return (
        <div className={classes.full}>
          <Card style={{ width: '50rem', height: '30rem' }}>
          <Card.Body>
            <Card.Title>Job Role</Card.Title>
            <Card.Text>{role}</Card.Text>

            <Card.Title>Company</Card.Title>
            <Card.Text>{company} {''} 
              <Button size="sm" href={link}>Visit them</Button> 
            </Card.Text>

            <Card.Title>Job Description</Card.Title>
            <Card.Text>{description}</Card.Text>          
          </Card.Body>
          </Card>             
        </div>
    );
}

export default JobDescription;
