import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../contexts/ThemeContext";

const MovieCard = ({ movie }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Card className={`${theme.mode} movie-card`}>
      <Card.Body>
        <Row>
          <Col sm="3" className="text-center">
            <Card.Img
              className="movie-poster"
              src={movie.poster}
              alt={movie.name}
            />
          </Col>
          <Col sm="9">
            <Card.Title>
              <h3>
                {movie.name} ({movie.year})
              </h3>
              <span className="rating">
                <small>Rating : </small>
                {movie.rating}/10
              </span>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {movie.genres}
            </Card.Subtitle>
            <hr />
            <Card.Text>
              Director(s) : {movie.directors}
              <br />
              Starring : {movie.starring}
            </Card.Text>
            <Card.Text>{movie.plot}</Card.Text>
            <Card.Link href="">View Reviews</Card.Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
