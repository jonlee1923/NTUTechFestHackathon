import React, { useState, useContext } from "react";
import { useHttpClient } from "../hooks/httpHook";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

        <div className="full-jon-information">
        <Card style={{ width: '50rem', height: '50rem' }}>
        <Card.Body>
          <Card.Title>Job Role</Card.Title>
          <Card.Text>
          {role}
        </Card.Text>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
                    <div className="job-role"> :  </div>

                    <div className="company-name"> Company: {company} </div>
                    
                    <div className="company-website"> Company Link: </div>
                    <a href={link}> {link} </a>

                    <div className="job-description"> Job Description </div>
                    <div className=""> {description} </div>
        </div>
    );
}

export default JobDescription;
