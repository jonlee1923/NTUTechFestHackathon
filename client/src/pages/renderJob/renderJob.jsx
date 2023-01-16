import React from "react";
import Card from 'react-bootstrap/Card';

import classes from "./renderJob.module.css";

import { AiFillStar } from "react-icons/ai"
import { MdLocationPin } from "react-icons/md"
import { FaBuilding } from "react-icons/fa"
import { GrUserWorker } from "react-icons/gr"
import { useNavigate } from "react-router-dom";

const Job = (props) => {

    const {
        companyName,
        jobDesc,
        location,
        offeredRole,
        starRating,
        url,
    } = props.data

    let navigate = useNavigate(); 

    return (
        <Card className={classes.card} onClick={() => {
            // console.log(props);
            navigate("/fullJobDescription", {state:{props}})
        }}>
        <Card.Body>
        <Card.Title> {<FaBuilding className="mb-1" style={{height:'16px'}}/>} {companyName} </Card.Title>
        <hr/>
        <Card.Subtitle className="mb-2"> {<GrUserWorker className="mb-1" style={{height:'16px'}}/>} {offeredRole}</Card.Subtitle>
        <Card.Subtitle  className="mb-2">{<AiFillStar className="mb-1" style={{height:'16px'}}/>} {starRating} </Card.Subtitle>
        <Card.Subtitle> {<MdLocationPin className="mb-1" style={{height:'16px'}}/>} {location} </Card.Subtitle>
        </Card.Body>
        </Card>
    );
}
export default Job;