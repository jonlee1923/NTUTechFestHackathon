import React from "react";
import { useState, useEffect } from "react";
import Job from "./renderJob.jsx";
import { useHttpClient } from "../hooks/httpHook";
import { Container, Form, Button, Pagination } from "react-bootstrap";

export default function JobListings() {
    const { sendRequest } = useHttpClient();

    const[jobListing, setJobListing] = useState('');
    const[renderJobs, setRenderJobs] = useState('');
    const[searchInput, setSearchInput] = useState('');
    const[locationFilter, setLocationFilter] = useState('');
    const[currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    
    const nPages = renderJobs != '' ? Math.ceil(renderJobs.length / recordsPerPage) : 0;
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = renderJobs.slice(indexOfFirstRecord,indexOfLastRecord);
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        let url = "http://localhost:5000/api/jobs";
        // fetch job listings
        const response = await sendRequest(url);
        // console.log(response);
        setJobListing(response.jobs);
        setRenderJobs(response.jobs);
    }
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const searchFilter = (data) => {
        if(data.companyName.toLowerCase().includes(searchInput.toLowerCase()) || 
            data.offeredRole.toLowerCase().includes(searchInput.toLowerCase())) {
                // TODO: fix this bad logic -> use dictionary to store key mappings
                if ((locationFilter == 'Choose location' || locationFilter == '' || 
                    data.location.toLowerCase() == locationFilter)) {
                        return data;
                }
            }
        else {
            return null;
        }
    }

    const populateSelection = () => {
        let items = [];
        let duplicates = [];
        let idx = 0;
        jobListing.map((d) => {
            if (!duplicates.includes(d.location.toLowerCase())) {
                items.push(<option key={idx} value={d.location.toLowerCase()}>{d.location}</option>);
                duplicates.push(d.location.toLowerCase());
                idx += 1;
            }
        });
        return items;
    }

    const handleLocationFilter = (e) => {
        e.preventDefault();
        setLocationFilter(e.target.value);
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

    const handleSearch = () => {
        let updatedJobListing = [];
        let listing = null;
        if (searchInput.length > 0 || locationFilter != '') {
            jobListing.map((d) => (
                listing = searchFilter(d), 
                listing != null ? updatedJobListing.push(listing) : null
            ))
            
            // console.log(updatedJobListing);
            setRenderJobs(updatedJobListing);
        }
        else {
            setRenderJobs(jobListing);
        }
    }

    const handlePage = (page) => {
        setCurrentPage(page);
    }

    return (
        <Container >
           <Form className="d-flex mt-4">
             <Form.Control
              type="search"
              name="jobsearch"
              placeholder="e.g. Product Developer"
              className="me-2 w-50"
              aria-label="Search"
              onChange={handleChange}
             />
            <Form.Select 
             className="me-2 w-25"
             aria-label="Select"
             onChange={handleLocationFilter}>
              <option>Choose location</option>
              {jobListing != '' ? populateSelection() : null}
            </Form.Select>

             <Button onClick={handleSearch} variant="outline-success">Search</Button>
            </Form>
            <p className="p-2 mt-3" style={{ fontWeight: 'bold' }}> Job listings found: {renderJobs.length}</p>
            {renderJobs == '' ? null : renderJobs.map((d) => ( 
                <Job data={d} />
            ))}
            <Pagination 
             className="mx-5"
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
            
    );
};