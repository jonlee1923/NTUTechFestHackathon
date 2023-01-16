import { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/httpHook";
import { Container, Form, Button } from "react-bootstrap";
import classes from "./editExperience.module.css";
import { useNavigate, useParams } from "react-router-dom";

const EditExperience = () => {
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [datestart, setDateStart] = useState("");
  const [dateend, setDateEnd] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const { eid } = useParams();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("position", position);
    formData.append("name", name);
    formData.append("datestart", datestart);
    formData.append("dateend", dateend);
    formData.append("country", country);
    formData.append("description", description);
    console.log(name, description, eid);
    const responseData = await sendRequest(
      `http://localhost:5000/api/experience/updateExp/${eid}`,
      "PATCH",
      formData,
    );
    console.log(responseData);
    if (responseData === "success") console.log("success");
    else console.log("fail");
  };

  const positionChange = (event) => {
    setPosition(event.target.value);
  };
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const dateStartChange = (event) => {
    setDateStart(event.target.value);
  };
  const dateEndChange = (event) => {
    setDateEnd(event.target.value);
  };
  const countryChange = (event) => {
    setCountry(event.target.value);
  };
  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Container className={classes.container}>
    <h4 className={classes.title}>Edit Experiences</h4>
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

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Position"
            className={classes.input}
            onChange={positionChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Date Start</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Start Date"
            className={classes.input}
            onChange={dateStartChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Date Start</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter End Date"
            className={classes.input}
            onChange={dateEndChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            className={classes.input}
            onChange={countryChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            className={classes.input}
            onChange={descriptionChange}
          />
          <Form.Text>Enter a short description about yourself</Form.Text>
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EditExperience;
