import { useState, useEffect } from "react";
import { useHttpClient } from "../hooks/httpHook";
import React from "react";

export default function Jobs() {
    const [jobs, setJobs] = useState(null);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const getJobs = async () => {
        let url = "http://localhost:5000/api/jobs";
        const response = await sendRequest(url);

        console.log(response);

        setJobs(response.jobs);
    };

    useEffect(() => {
        getJobs();
        console.log(jobs);
    });

    return <div></div>;
}
