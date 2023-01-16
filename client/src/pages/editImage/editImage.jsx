import { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";

export default function Image() {
    const auth = useContext(AuthContext);
    const [file, setFile] = useState("");
    const [age, setAge] = useState("");
    const [desc, setDesc] = useState("");
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        console.log(auth.userId);
        console.log(file);
        formData.append("image", file);
        formData.append("age", age);
        formData.append("desc", desc);
        console.log(age, desc);

        const responseData = await sendRequest(
            `http://localhost:5000/api/users/updateone/${auth.userId}`,
            "PATCH",
            formData
        );
        console.log(responseData);
    };

    const ageChange = (event) => {
        setAge(event.target.value);
    };
    const descChange = (event) => {
        setDesc(event.target.value);
    };

    return (
        <form onSubmit={submit}>
            <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
            ></input>
            <input value={age} onChange={ageChange}></input>
            <input value={desc} onChange={descChange}></input>
            <button type="submit">Submit</button>
        </form>
    );
}
