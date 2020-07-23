import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../../contexts";

const ReviewCard = ({ review }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Card className={`${theme.mode} review-card`}>
      <Card.Body>
        <Row>
          <Col sm="3" className="text-center">
            <Card.Subtitle className="mb-2 text-muted">
              {review.author.username}
            </Card.Subtitle>
            <hr />
            <h2>{review.rating}</h2>
          </Col>
          <Col sm="9">
            <Card.Text>{review.content}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
