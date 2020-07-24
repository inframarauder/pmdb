import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../../contexts";

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
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {movie.genres}
              <span className="rating">
                <small>Rating : </small>
                {movie.rating.toFixed(2)}/10
              </span>
            </Card.Subtitle>
            <hr />
            <Card.Text>
              Director(s) : {movie.directors}
              <br />
              Starring : {movie.starring}
            </Card.Text>
            <Card.Link href={`/reviews/movie/${movie._id}`}>
              View Reviews
            </Card.Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
