import React from "react";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import classes from "./renderCompanyJob.module.css";

import { AiFillStar } from "react-icons/ai"
import { MdLocationPin } from "react-icons/md"
import { FaBuilding } from "react-icons/fa"
import { GrUserWorker } from "react-icons/gr"
import { useNavigate } from "react-router-dom";

import { AiTwotoneDelete } from "react-icons/ai"
import { useHttpClient } from "../../hooks/httpHook";

const Job = (props) => {

    const { sendRequest } = useHttpClient();

    const {
        companyName,
        jobDesc,
        location,
        offeredRole,
        _id,
    } = props.data

    const handleDelete = async () => 
    {
        let url = "http://localhost:5000/api/jobs/delete/" + _id //companyId;
        
        // fetch company job listings
        const response = await sendRequest(url, "DELETE");
        console.log(response);
    }

    let navigate = useNavigate(); 

    return (
        <Card className={classes.card} >
         <Card.Body>
          <Card.Title> {<FaBuilding className="mb-1" style={{height:'16px'}}/>} {companyName} </Card.Title>
           <hr/>
           <Card.Subtitle className="mb-2"> {<GrUserWorker className="mb-1" style={{height:'16px'}}/>} {offeredRole}</Card.Subtitle>
           <Card.Subtitle> {<MdLocationPin className="mb-1" style={{height:'16px'}}/>} {location} </Card.Subtitle>
            &nbsp;
           <Card.Title className="text-muted"> Job Description</Card.Title>
           &nbsp;
           <Card.Subtitle> {jobDesc} </Card.Subtitle>
         </Card.Body>
         <AiTwotoneDelete onClick={handleDelete} className={classes.deleteButton}/>  
        </Card>
    );
}
export default Job;