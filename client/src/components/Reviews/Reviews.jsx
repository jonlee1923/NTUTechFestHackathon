import React, { useState } from "react";
import classes from "./Reviews.module.css";
import UserImage from "../../components/UserImage/UserImage";
import profilepic from "../../assets/randompic.png";
import profilepic2 from "../../assets/Profilepic.jpg";
import profilepic3 from "../../assets/TechLink.jpg";

import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Reviews = () => {
  const randomtext =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  const reviewList = [
    {
      src: profilepic,
      description: randomtext,
    },
    {
      src: profilepic2,
      description: randomtext,
    },
    {
      src: profilepic3,
      description: randomtext,
    },
  ];

  const [activeReview, setActiveReview] = useState(0);

  return (
    <div className={classes.reviews}>
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
                <p>{review.description}</p>
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
          </Card>
        );
      })}
    </div>
  );
};

export default Reviews;
