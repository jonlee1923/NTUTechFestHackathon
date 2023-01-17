import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../hooks/httpHook";

export default function CreateEditEdu() {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [grade, setGrade] = useState("");
    const [description, setDescription] = useState("");
    const [maxGrade, setMaxGrade] = useState("");
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { userId } = useContext(AuthContext);
    const [educations, setEducations] = useState({});

    useEffect(() => {
        const fetchEducations = async () => {
            let url = `http://localhost:5000/api/education/${userId}`;
            // fetch job listings
            const response = await sendRequest(url);
            console.log(response);
            // setEducations(response.educations)
        };

        fetchEducations()
    }, []);

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            // Send a request to the server with the email and password
            console.log("user", userId);
            let url = `http://localhost:5000/api/education/createEducation/${userId}`;
            let method = "POST";
            let body = JSON.stringify({
                name: name,
                course: course,
                datestart: dateStart,
                dateend: dateEnd,
                grade: grade,
                maxGrade: maxGrade,
                description: description,
            });
            let headers = {
                "Content-Type": "application/json",
            };
            console.log("clicked");
            const response = await sendRequest(url, method, body, headers);
            console.log(response);
        } catch (err) {}
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };

    const handleDateStartChange = (event) => {
        setDateStart(event.target.value);
    };
    const handleDateEndChange = (event) => {
        setDateEnd(event.target.value);
    };
    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleMaxGradeChange = (event) => {
        setMaxGrade(event.target.value);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={handleNameChange} />
                <input value={course} onChange={handleCourseChange} />
                <input value={dateStart} onChange={handleDateStartChange} />
                <input value={dateEnd} onChange={handleDateEndChange} />
                <input value={grade} onChange={handleGradeChange} />
                <input value={description} onChange={handleDescriptionChange} />
                <input value={maxGrade} onChange={handleMaxGradeChange} />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
