import React from "react";
import { useState, useEffect } from "react";
import Job from "./job.jsx";
import { useHttpClient } from "../hooks/httpHook";

export default function DisplayJobsListing() {
    const[jobListing, setJobListing] = useState('');
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        let url = "http://localhost:5000/api/jobs";
        // fetch job listings
        const response = await sendRequest(url);
        // console.log(response);
        setJobListing(response.jobs);
    }

    return (
        <div className="jobs">
            {jobListing == '' ? null : jobListing.map((d) => ( 
                <Job data={d} />
            ))}
        </div>
    );
};