import React, { useContext, useState } from "react";
import classes from "./homePage.module.css";
import gotjob from "../../assets/gotjob.jpg";
import { AuthContext } from "../../context/authContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Reviews from "../../components/Reviews/Reviews";

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
      <Reviews/>
    </div>
  );
};

export default HomePage;
