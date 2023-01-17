import React from "react";
import { useState, useEffect, useFocusEffect } from "react";
import Job from "../renderCompanyJob/renderCompanyJob.jsx";
import { useHttpClient } from "../../hooks/httpHook";
import { Container, Form, Button, Pagination, Row, Col } from "react-bootstrap";

import { BiSearchAlt2 } from "react-icons/bi";
import { CiLocationArrow1 } from "react-icons/ci";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import classes from "./companyJobListingPage.module.css";



export default function CompanyJobListings() {

    let navigate = useNavigate();
    const {state} = useLocation();
    const { sendRequest } = useHttpClient();
    const[jobListing, setJobListing] = useState('');
    const[renderJobs, setRenderJobs] = useState('');
    const[currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [companyId, setCompanyId] = useState(null);
    const nPages = renderJobs != '' ? Math.ceil(renderJobs.length / recordsPerPage) : 0;
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    useEffect(() => {
        fetchJobs();
        if (state.companyId != null)
            setCompanyId(state.companyId);
    }, []);


    const fetchJobs = async () => {
        let url = "http://localhost:5000/api/jobs/getjobs/" + "63c57da4d6504a2a89afea4d" //companyId;
        // fetch company job listings
        const response = await sendRequest(url);
        setJobListing(response.jobs);
        setRenderJobs(response.jobs);
    }
    
    const handleChange = (e) => {
        e.preventDefault();
    }

    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    const firstPage = () => {
        setCurrentPage(pageNumbers[0])
    }

    const lastPage = () => {
        setCurrentPage(pageNumbers[pageNumbers.length-1])
    }

    const handlePage = (page) => {
        setCurrentPage(page);
    }

    return (
        <Container>
            <hr/>
            <Container className={classes.listnum}>
                <p style={{ fontWeight: 'bold' }}> Job listings found: {renderJobs.length}</p>
                <p className={classes.listnum2} style={{ fontWeight: 'bold' }}> Displaying {(currentPage-1)*recordsPerPage + renderJobs.slice(indexOfFirstRecord, indexOfLastRecord).length} of {renderJobs.length} results </p>
            </Container>
            
                {renderJobs == '' ? null : renderJobs.slice(indexOfFirstRecord, indexOfLastRecord).map((job) => ( 
                        <Container className={classes.card}>
                           <Job data={job} />
                        </Container>
                ))}
            <Container className={classes.pagination}>
                <Pagination 
                 nPages = { nPages }
                 currentPage = { currentPage }
                 setCurrentPage = { setCurrentPage }>
                    <Pagination.First 
                     onClick={firstPage}/>
                    <Pagination.Prev 
                     onClick={prevPage}
                     href='#'/>
                    {pageNumbers.map((pgNumber) => {
                        let state = currentPage == pgNumber ? true : false; 
                        return <Pagination.Item active={state} onClick={() => {handlePage(pgNumber)}} > {pgNumber} </Pagination.Item>
                    })}
                    <Pagination.Next 
                    onClick={nextPage}/>
                    <Pagination.Last 
                    onClick={lastPage}/>
                </Pagination>
            </Container>
        </Container>
    );
};