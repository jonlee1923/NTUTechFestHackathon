import React from "react";
import Card from 'react-bootstrap/Card';

import classes from "./renderJob.module.css";

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
        <Card className={classes.card}>
         <Card.Body>
          <Card.Title> {companyName} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{offeredRole}</Card.Subtitle>
          <Card.Subtitle> {starRating} </Card.Subtitle>
          <Card.Subtitle> {location} </Card.Subtitle>
         </Card.Body>
        </Card>
    );
}
export default Job;