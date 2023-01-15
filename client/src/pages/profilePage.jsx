import { useContext, useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

import UserImage from "../components/UserImage/UserImage";
import PersonalDetails from "../components/PersonalDetails/PersonalDetails";
import Education from "../components/Education/Education";
import { AuthContext } from "../context/authContext";
import { useHttpClient } from "../hooks/httpHook";


import classes from "./profilePage.module.css";

const randomtext =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

const profile = {
  name: "Jonathan Lee",
  age: "25",
  description: randomtext,
};

function Profile() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    const getUser = async() => {
        const responseData = await sendRequest(
            `http://localhost:5000/api/users/profilepage/${auth.userId}`,
            "GET",
        );
        setUser(responseData);
        console.log("user",user);
    }

    useEffect(()=>{
        getUser();
    },[auth]);

  return (
    <Container>
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title>
            Profile{" "}
            <span>
              <a href="/editimage">
                <span>
                  <PencilFill className={classes.editbtn} />
                </span>
              </a>
            </span>
          </Card.Title>

          <Row>
            <Col>
              <UserImage className={classes.userimage} />
            </Col>
            <Col>
              <PersonalDetails
                className={classes.personaldetail}
                profile={user}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{profile.description}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title>
            Education{" "}
            <span>
              <a href="#">
                <span>
                  <PencilFill className={classes.editbtn} />
                </span>
              </a>
            </span>
          </Card.Title>
          <Education />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
