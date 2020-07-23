import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../../contexts";

const ReviewMovie = ({ movie }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Card className={`${theme.mode} review-movie-card`}>
      <Card.Body>
        <div className="text-center">
          <h3>
            {movie.name} ({movie.year})
          </h3>
          <Card.Subtitle className="mb-2 text-muted">
            {movie.genres}
          </Card.Subtitle>
          <Card.Img
            className="movie-poster"
            src={movie.poster}
            alt={movie.name}
          />
          <Card.Title>
            <small>Rating : </small>
            {movie.rating}/10
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {movie.runtime}
          </Card.Subtitle>
        </div>
        <div>
          <hr />
          <Card.Text>
            Director(s) : {movie.directors}
            <br />
            Starring : {movie.starring}
          </Card.Text>
          <Card.Text>{movie.plot}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewMovie;
