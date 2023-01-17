import { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/httpHook";
import { AuthContext } from "../../context/authContext";
import { Container, Form, Button } from "react-bootstrap";
import classes from "./editGithub.module.css";
import { useNavigate, useParams } from "react-router-dom";

const EditGithub = () => {
  const [link, setLink] = useState("");
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submit = async (event) => {
    event.preventDefault();

    let body = JSON.stringify({
      link: link,
    });

    const responseData = await sendRequest(
      `http://localhost:5000/api/users/updateGithub/${auth.userId}`,
      "POST",
      body,
    );
    console.log(responseData);
    if (responseData === "success") console.log("success");
    else console.log("fail");
  };

  const linkChange = (event) => {
    setLink(event.target.value);
  };

  return (
    <Container className={classes.container}>
      <h4 className={classes.title}>Edit Github Link</h4>
      <form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Github Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Link"
            className={classes.input}
            onChange={linkChange}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EditGithub;
