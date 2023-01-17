import { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/httpHook";
import { Container, Form, Button } from "react-bootstrap";
import classes from "./editEducation.module.css";
import { useNavigate, useParams } from "react-router-dom";

const EditEducation = () => {
    const [course, setCourse] = useState("");
    const [name, setName] = useState("");
    const [datestart, setDateStart] = useState("");
    const [dateend, setDateEnd] = useState("");
    const [grade, setGrade] = useState("");
    const [maxgrade, setMaxGrade] = useState("");
    const [description, setDescription] = useState("");

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();
    const { eid } = useParams();

    const submit = async (event) => {
        event.preventDefault();

        // const formData = new FormData();
        // formData.append("course", course);
        // formData.append("name", name);
        // formData.append("datestart", datestart);
        // formData.append("dateend", dateend);
        // formData.append("grade", grade);
        // formData.append("maxgrade", maxgrade);
        // formData.append("description", description);

        let body = JSON.stringify({
            course: course,
            name: name,
            datestart: datestart,
            dateend: dateend,
            grade: grade,
            maxgrade: maxgrade,
            description: description
        });

        console.log(
            name,
            course,
            grade,
            maxgrade,
            description,
            typeof datestart,
            dateend
        );
        const responseData = await sendRequest(
            `http://localhost:5000/api/education/updateEducation/${eid}`,
            "POST",
            body,
            {
                "Content-Type": "application/json",
            }
        );
        console.log(responseData);
        if (responseData === "success") console.log("success");
        else console.log("fail");
    };

    const courseChange = (event) => {
        setCourse(event.target.value);
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
    const gradeChange = (event) => {
        setGrade(event.target.value);
    };
    const maxGradeChange = (event) => {
        setMaxGrade(event.target.value);
    };
    const descriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <Container className={classes.container}>
            <h4 className={classes.title}>Edit Educations</h4>
            <form onSubmit={submit}>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        className={classes.input}
                        onChange={nameChange}
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                >
                    <Form.Label>Course</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Course"
                        className={classes.input}
                        onChange={courseChange}
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                >
                    <Form.Label>Date Start</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter Start Date"
                        className={classes.input}
                        onChange={dateStartChange}
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                >
                    <Form.Label>Date Start</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter End Date"
                        className={classes.input}
                        onChange={dateEndChange}
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput5"
                >
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Grade"
                        className={classes.input}
                        onChange={gradeChange}
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput6"
                >
                    <Form.Label>Max Grade</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Max Grade"
                        className={classes.input}
                        onChange={maxGradeChange}
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput7"
                >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Description"
                        className={classes.input}
                        onChange={descriptionChange}
                    />
                    <Form.Text>
                        Enter a short description about yourself
                    </Form.Text>
                </Form.Group>

                <Button variant="outline-primary" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default EditEducation;
