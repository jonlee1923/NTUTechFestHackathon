import { useState, useContext } from "react";
import { useHttpClient } from "../hooks/httpHook";
import { AuthContext } from "../context/authContext";

export default function Image() {
    const auth = useContext(AuthContext);
    const [file, setFile] = useState();
    const [caption, setCaption] = useState("");
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        console.log(auth.userId)
        console.log(file)
        formData.append("image", file);
        console.log(formData);
        const responseData = await sendRequest(
            `http://localhost:5000/api/users/uploaddp/${auth.userId}`,
            "PATCH",
            formData,
        );
        console.log(responseData);
    };

    return (
        <form onSubmit={submit}>
            <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
            ></input>
            <button type="submit">Submit</button>
        </form>
    );
}
