import React from "react";
import Card from 'react-bootstrap/Card';

const Job = (props) => {

    const {
        companyName,
        jobDesc,
        location,
        offeredRole,
        starRating,
        url,
    } = props.data

    return (
        <Card style={{ width:'50rem' }}>
         <Card.Body>
          <Card.Title> {companyName} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{offeredRole}</Card.Subtitle>
          <Card.Subtitle> {starRating} {location}  </Card.Subtitle>
          </Card.Body>
        </Card>
    );
}
export default Job;