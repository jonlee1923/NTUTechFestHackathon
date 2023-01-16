import { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";
import { Container, Form, Button } from "react-bootstrap";
import classes from "./editImage.module.css";
import { useNavigate } from "react-router-dom";

export default function Image() {
  const auth = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [nav, setNav] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    console.log(auth.userId);
    console.log(file.path);
    formData.append("image", file);
    formData.append("age", age);
    formData.append("name", name);
    formData.append("desc", desc);
    console.log(age, name, desc);

    const responseData = await sendRequest(
      `http://localhost:5000/api/users/updateone/${auth.userId}`,
      "PATCH",
      formData
    );
    console.log(responseData);
    if (responseData === "success") navigate("/profile");
    else navigate("/editimage");
  };

  const ageChange = (event) => {
    setAge(event.target.value);
  };
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const descChange = (event) => {
    setDesc(event.target.value);
  };

  return (
    <Container className={classes.container}>
      <h4 className={classes.title}>Edit Personal Details</h4>
      <form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            className={classes.input}
            onChange={nameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Age"
            className={classes.input}
            onChange={ageChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            className={classes.input}
            onChange={descChange}
          />
          <Form.Text>Enter a short description about yourself</Form.Text>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Profile Picture</Form.Label>
          <Form.Control
            className={classes.input}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}
// <Container>
//   <form onSubmit={submit}>
//     <input
//       onChange={(e) => setFile(e.target.files[0])}
//       type="file"
//       accept="image/*"
//     ></input>
//     <input value={name} onChange={nameChange}></input>
//     <input value={age} onChange={ageChange}></input>
//     <button type="submit">Submit</button>
//   </form>
// </Container>
