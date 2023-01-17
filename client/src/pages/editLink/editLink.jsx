import { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";
import { Container, Form, Button } from "react-bootstrap";
import classes from "./editImage.module.css";
import { useNavigate } from "react-router-dom";

const EditLink = () => {
  const auth = useContext(AuthContext);
  const [git, setGit] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("git", git);
    formData.append("portfolio", portfolio);

    let body = JSON.stringify({
        github: git,
        portfolio: portfolio,
    });

    const responseData = await sendRequest(
        `http://localhost:5000/api/education/updateEducation/${eid}`,
        "POST",
        body,
        {
            "Content-Type": "application/json",
        }
    );
    console.log(responseData);
    if (responseData === "success") navigate("/profile");
    else navigate("/editimage");
  };

  const gitChange = (event) => {
    setGit(event.target.value);
  };
  const portfolioChange = (event) => {
    setPortfolio(event.target.value);
  };

  return (
    <Container className={classes.container}>
      <h4 className={classes.title}>Edit Links</h4>

      <form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Github Link"
            className={classes.input}
            onChange={gitChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Portfolio Website Link"
            className={classes.input}
            onChange={portfolioChange}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EditLink;
