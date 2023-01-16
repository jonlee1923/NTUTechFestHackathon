import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useHttpClient } from "../hooks/httpHook";
// import Image from "./image";
// import Jobs from "./jobs";

function Login() {
    const { login, logout, token, userId, isLoggedIn } =
        useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        if (isLoginMode) {
            try {
                event.preventDefault();
                // Send a request to the server with the email and password
                let url = "http://localhost:5000/api/users/login";
                let method = "POST";
                let body = JSON.stringify({
                    email: email,
                    password: password,
                });
                let headers = {
                    "Content-Type": "application/json",
                };

                const response = await sendRequest(url, method, body, headers);
                login(response._id, response.token);
                console.log(response._id, response.token);
            } catch (err) {}
        } else {
            try {
                event.preventDefault();

                let body = JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                });
                let headers = {
                    "Content-Type": "application/json",
                };
                const responseData = await sendRequest(
                    "http://localhost:5000/api/users/signup",
                    "POST",
                    body,
                    headers
                );
                console.log("before login");
                console.log(responseData.userId);
                login(responseData.userId, responseData.token);
            } catch (err) {}
        }
    };

    const handleModeclick = () => {
        console.log("Context Token", token);
        console.log("Context UserId", userId);
        setIsLoginMode(!isLoginMode);
    };

    return (
        <div className="flex flex-col">
            <button
                onClick={() => {
                    handleModeclick();
                }}
            >
                {isLoginMode ? "login" : "sign up"}
            </button>
            <form onSubmit={handleSubmit}>
                <label hidden={isLoginMode}>
                    Name:
                    <input
                        type="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <button type="submit">Login</button>
            </form>

            {/* <Image /> */}
            {/* <Jobs/> */}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
