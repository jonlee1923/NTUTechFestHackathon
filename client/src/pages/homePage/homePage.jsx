import React, { useContext } from "react";
import classes from "./homePage.module.css";
import gotjob from "../../assets/gotjob.jpg";
import profilepic from "../../assets/randompic.png";
import { AuthContext } from "../../context/authContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import UserImage from "../../components/UserImage/UserImage";

const HomePage = () => {
  const randomtext =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  const auth = useContext(AuthContext);
  return (
    <div>
      <div className={classes.firstdiv}>
        <Container className={classes.messagediv}>
          <h3>
            Confidence is key! <br />
            <br /> Start your job search now!
            <br />
            <br /> Explore, Research and Secure your career!
          </h3>
          <img src={gotjob} alt="gotjob" />
        </Container>
        <div className={classes.btndiv}>
          <Button className={classes.questionairebtn}>
            Get started now! <br />
            (Questionaire Btn)
          </Button>
        </div>
      </div>
      <div className={classes.reviews}>
        <Card className={classes.card}>
          <Row>
            <Col xs={1}>
              <ArrowLeft size={40} className={classes.arrows}/>
            </Col>
            <Col xs={3}>
              <UserImage src={profilepic} />
            </Col>
            <Col xs={7}>
              <p>{randomtext}</p>
            </Col>
            <Col xs={1}>
              <ArrowRight size={40} className={classes.arrows}/>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
