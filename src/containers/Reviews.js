import React, { useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext, ReviewContext } from "../contexts";
import { Spinner } from "../components/Layouts";
import ReviewCard from "../components/Reviews/ReviewCard";
import MovieCard from "../components/Movies/MovieCard";
import { Row, Col, Container } from "react-bootstrap";
import Api from "../Api";

const Reviews = ({ match: { params } }) => {
  const { theme } = useContext(ThemeContext);
  const { reviewState, setMovieAndReviews } = useContext(ReviewContext);

  useEffect(() => {
    (async () => {
      try {
        const [movie, reviews] = await Promise.all([
          Api.loadMovieById(params.id),
          Api.loadReviewsByMovieId(params.id),
        ]);

        setMovieAndReviews(movie.data, reviews.data);
      } catch (error) {
        console.error(error.response.data);
        toast.error(error.response.data.error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const { movie, reviews, loading } = reviewState;

  return (
    <div className={`${theme.mode} main`}>
      <ToastContainer />
      <div className="movie-review-area">
        {loading ? (
          <Spinner />
        ) : (
          <div className="movie-info">
            <Row>
              <Col sm="4">
                <MovieCard movie={movie} />
              </Col>
              <Col sm="8"></Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
