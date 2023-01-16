import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../hooks/httpHook";

export default function CreateEditExp() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { userId } = useContext(AuthContext);
    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            // Send a request to the server with the email and password
            console.log("user", userId)
            let url = `http://localhost:5000/api/experience/createExp/${userId}`;
            let method = "POST";
            let body = JSON.stringify({
                name: name,
                position: position,
                datestart: dateStart,
                dateend: dateEnd,
                country: country,
                description: description,
            });
            let headers = {
                "Content-Type": "application/json",
            };
            console.log("clicked")
            const response = await sendRequest(url, method, body, headers);
            console.log(response);
        } catch (err) {}
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };

    const handleDateStartChange = (event) => {
        setDateStart(event.target.value);
    };
    const handleDateEndChange = (event) => {
        setDateEnd(event.target.value);
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    return (
        <div>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={handleNameChange} />
                <input value={position} onChange={handlePositionChange} />
                <input value={dateStart} onChange={handleDateStartChange} />
                <input value={dateEnd} onChange={handleDateEndChange} />
                <input value={country} onChange={handleCountryChange} />
                <input value={description} onChange={handleDescriptionChange} />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
