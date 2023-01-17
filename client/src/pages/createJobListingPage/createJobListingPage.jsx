import classes from "./createJobListingPage.module.css";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {useLocation} from 'react-router-dom';
import { useEffect } from "react";

import { useHttpClient } from "../../hooks/httpHook";

// company name, job title, job desc, salary(?), location

export default function CreateJobListings() {

    const { sendRequest } = useHttpClient();

    let navigate = useNavigate(); 
    const {state} = useLocation();

    const [companyName, setCompanyName] = useState(null);
    const [jobPos, setjobPos] = useState(null);
    const [location, setLocation] = useState(null);
    const [jobDesc, setJobDesc] = useState(null);
    const [showFailure, setShowFailure] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [goBack, setGoBack] = useState(false);
    const [companyId, setCompanyId] = useState(null);

    useEffect(() => {
        if (state.companyName != null) 
            setCompanyName(state.companyName);
        if (state.companyId != null)
            setCompanyId(state.companyId);
    }, []);

    const handleCompanyName = (e) => {
        e.preventDefault();
        setCompanyName(e.target.value);
    }

    const handleJobPos = (e) => {
        e.preventDefault();
        setjobPos(e.target.value);
    }

    const handleLocation = (e) => {
        e.preventDefault();
        setLocation(e.target.value);
    }

    const handleJobDesc = (e) => {
        e.preventDefault();
        setJobDesc(e.target.value);
    }

    const submitForm = async () => {
        if (companyName && jobPos && location && jobDesc) {
            // console.log(companyName, jobPos, location, jobDesc);
            // companyName, offeredRole, location, jobDesc
            let url = "http://localhost:5000/api/jobs/" + companyId;

            let method = "POST";
            let body = JSON.stringify({
                companyName: companyName,
                offeredRole: jobPos,
                location: location,
                jobDesc: jobDesc,
            });
            let headers = {
                "Content-Type": "application/json",
            };
            // temp bypass without await, not too sure why it's not replying with a resp
            sendRequest(url, method, body, headers);
            setShowSuccess(true);
        }
        else {
            setShowFailure(true);
        }
    }
    
    if (showSuccess) {
        return(
            <Alert className={classes.alertBox} variant="success" onClose={() => {setShowSuccess(false); setGoBack(true)}} dismissible>
                <Alert.Heading>Success! You have successfully created a listing!</Alert.Heading>
                <p>
                    Go back to your homepage and view the listing you have created!
                </p>
            </Alert>
        )
    }

    if (goBack) {
        navigate('/companyProfilePage');
    }

    return (
        <Container >
            { showFailure ? 
                <Alert className={classes.alertBox} variant="danger" onClose={() => setShowFailure(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                    All the fields are not filled. Please try again after filling them up!
                    </p>
                </Alert> 
                : null
            }
            <p className={classes.title}>Create Job Listing</p>
            <hr/>
            <Form className={classes.formContainer}>
            <Form.Group className={classes.formGroup}>

            <Container className="d-flex">
                <Form.Label className="mt-1">Company Name: </Form.Label>
                <Form.Control
                    type='search'
                    placeholder= "e.g. Techlink Inc."
                    className={classes.controlForm1}
                    onChange={handleCompanyName}
                    value={companyName}
                />
            </Container>
             
             <Container className="d-flex mt-3">
                <Form.Label className="mt-1">Job Position: </Form.Label>
                <Form.Control
                    type='form'
                    placeholder= "e.g. Software Engineer"
                    className={classes.controlForm2}
                    onChange={handleJobPos}
                />
             </Container>

             <Container className="d-flex mt-3">
                <Form.Label className="mt-1">Location: </Form.Label>
                <Form.Control
                    type='form'
                    placeholder= "e.g. Singapore"
                    className={classes.controlForm3}
                    onChange={handleLocation}
                />
             </Container>

             <Container className="d-flex mt-3">
                <Form.Label className="mt-1">Job Description: </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    type='form'
                    placeholder= "e.g. Software Engineering"
                    className={classes.textareaForm}
                    onChange={handleJobDesc}
                />
             </Container>
             </Form.Group>
            </Form>
            <Container className={classes.submitBtn}>
             <Button onClick={submitForm} variant="secondary">Create Listing</Button>
            </Container>
        </Container>
    );
}