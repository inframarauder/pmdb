import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext, AuthContext } from "../../contexts";
import Api from "../../Api";

const ReviewMovie = ({ movie }) => {
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  const [state, setState] = useState({
    userReview: null,
  });

  useEffect(() => {
    (async () => {
      try {
        if (auth.isLoggedIn) {
          const res = await Api.loadUserMovieReview(movie._id);
          setState({ ...state, userReview: res.data });
        }
      } catch (error) {
        console.error(error);
        toast.error(error);
      }
    })();
  }, []);

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
        <hr />
        {state.userReview && (
          <div className="user-review-area">
            <Card.Text className="mb-2 text-muted text-center">
              Your Review:
            </Card.Text>
            <Card.Text className="text-center">
              {state.userReview.rating}
            </Card.Text>
            <Card.Text>{state.userReview.content}</Card.Text>
            <Button variant="secondary">Edit</Button>
          </div>
        )}
        {auth.isLoggedIn && !state.userReview && (
          <Button variant="secondary">Write Review</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReviewMovie;
