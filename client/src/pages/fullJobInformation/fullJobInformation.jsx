import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from "./fullJobInformation.module.css";
import {FiMapPin} from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import JobListings from '../jobListingPage/jobListingsPage';

import {useLocation} from 'react-router-dom';

function JobDescription() {
    const {state} = useLocation();

    const role = state.props.data.offeredRole
    const company = state.props.data.companyName
    const link = state.props.data.url
    const description = state.props.data.jobDesc 
    const location = state.props.data.location
    

    // for modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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

              <div className = {classes.applyButtonContainer}> 
                <Button className = {classes.visitCompany} onClick={handleShow}>Apply Here</Button> 
              </div>
            </Card.Body>
          </Card>     
          
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm submission of job application?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Interested to apply for this job? Click confirm to send in your application!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        
    );
}

export default JobDescription;
