import React, { useState } from "react";
import classes from "./Reviews.module.css";
import UserImage from "../../components/UserImage/UserImage";
import profilepic1 from "../../assets/profilepic1.png";
import profilepic2 from "../../assets/profilepic2.jpg";
import profilepic3 from "../../assets/profilepic3.png";

import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Reviews = () => {
  const randomtext =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  const reviewList = [
    {
      name: "Jacob Bucker",
      position: "Software Engineer",
      company: "Facebook",
      src: profilepic1,
      description:
        "Works like a charm. I love the ease of the app and would highly recommend anyone looking for a career change into the tech industry to use it. This is the perfect opportunity for you to express what you are capable of.",
    },
    {
      name: "Alex James",
      position: "Data Analyst",
      company: "Amazon",
      src: profilepic2,
      description:
        "I didn't even know where to start as far as job hunting or how to connect with companies. TechLink has really helped made this part so easy! Thank you!",
    },
    {
      name: "Kobe Curry",
      position: "Cybersecurity Engineer ",
      company: "Netflix",
      src: profilepic3,
      description:
        "At first, I wasn't sure whether I was good enough for these tech roles due to me being part of the older generation. However, after a few days of applying for jobs on TechLink, I was quite startled by the amount of interviews I was asked to. Thank you for the wonderful opportunity TechLink!",
    },
  ];

  const [activeReview, setActiveReview] = useState(0);

  return (
    <Container className={classes.reviews}>
      {reviewList.map((review, i) => {
        return (
          <Card
            key={i}
            className={
              activeReview === i ? classes["active"] : classes["reviewcard"]
            }
          >
            <Row>
              <Col xs={1}>
                <ArrowLeft
                  size={40}
                  className={`${classes.arrows}`}
                  onClick={() => {
                    if (activeReview === 0) setActiveReview(2);
                    else setActiveReview(i - 1);
                    console.log(activeReview);
                  }}
                />
              </Col>
              <Col xs={3}>
                <UserImage src={review.src} className={classes.userimage} />
              </Col>
              <Col xs={7}>
                <Card className={classes.description}>
                  <p >{review.description}</p>
                </Card>
              </Col>
              <Col xs={1}>
                <ArrowRight
                  size={40}
                  className={`${classes.arrows} ${classes.rightarrow}`}
                  onClick={() => {
                    if (activeReview === 2) setActiveReview(0);
                    else setActiveReview(i + 1);
                    console.log(activeReview);
                  }}
                />
              </Col>
            </Row>
            <Row className={classes.details}>
              <Col xs={1} />
              <Col className={classes.detail}>
                <p>
                  <strong>
                    {review.name}, {review.position}
                  </strong>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={1} />
              <Col className={classes.company}>
                <p>
                  <strong>{review.company}</strong>
                </p>
              </Col>
            </Row>
          </Card>
        );
      })}
    </Container>
  );
};

export default Reviews;
