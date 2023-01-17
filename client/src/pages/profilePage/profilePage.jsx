import { useContext, useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

import UserImage from "../../components/UserImage/UserImage";
import PersonalDetails from "../../components/PersonalDetails/PersonalDetails";
import Education from "../../components/Education/Education";
import LinkDetails from "../../components/LinkDetails/LinkDetails";
import EditPencil from "../../components/EditPencil/EditPencil";
import Experience from "../../components/Experience/Experience";
import Skills from "../../components/Skills/Skills";
import Interests from "../../components/Interests/Interests";
import Description from "../../components/Description/Description";

import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../hooks/httpHook";

import classes from "./profilePage.module.css";

const randomtext =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

const profile = {
  name: "Jonathan Lee",
  age: "25",
  description: randomtext,
  github: "https://github.com/Gene9898",
  portfolio: "https://www.benjaminbrady.co.uk/illustration",
};

function Profile() {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    console.log(auth.userId);
    const responseData = await sendRequest(
      `http://localhost:5000/api/users/profilepage/${auth.userId}`
    );
    setUser(responseData);
    console.log("user", user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <Card className={classes.card}>
            <Card.Body>
              <Card.Title>
                Profile <EditPencil href="/editimage" />
              </Card.Title>

              <Row>
                <Col>
                  <UserImage className={classes.userimage} user={user} />
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
                  <Description profile={user}/>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={classes.sidecard} xs={4}>
            <Card.Title>
              Links <EditPencil href="/editlink" />
            </Card.Title>
            <Card.Body>
              <LinkDetails profile={profile} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Card className={classes.card}>
            <Card.Body>
              <Card.Title>
                Education <EditPencil href="/editedulist" />
              </Card.Title>
              <Education />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={classes.sidecard} xs={4}>
            <Card.Title>
              Skills <EditPencil href="#" />
            </Card.Title>
            <Card.Body>
              <Skills profile={profile} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Card className={classes.card}>
            <Card.Body>
              <Card.Title>
                Experience <EditPencil href="/editexplist" />
              </Card.Title>
              <Experience />
            </Card.Body>
          </Card>
        </Col>
        {/* <Col>
          <Card className={classes.sidecard} xs={4}>
            <Card.Title>
              Interests <EditPencil href="#" />
            </Card.Title>
            <Card.Body>
              <Interests profile={profile} />
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
}

export default Profile;
