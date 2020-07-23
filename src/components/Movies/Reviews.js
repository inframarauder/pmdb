import React, { useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext, ReviewContext } from "../../contexts";
import { Spinner } from "../Layouts";
import ReviewCard from "./ReviewCard";
import { BASE_URL } from "../../configs";
import { Row, Col, Container } from "react-bootstrap";

const Reviews = ({ match: { params } }) => {
  const { theme } = useContext(ThemeContext);
  const { reviewState, setMovieAndReviews } = useContext(ReviewContext);

  useEffect(() => {
    (async () => {
      try {
        const movieRes = axios.get(`${BASE_URL}/movies/${params.id}`);
        const reviewRes = axios.get(`${BASE_URL}/reviews/movie/${params.id}`);
        const [movie, reviews] = await Promise.all([movieRes, reviewRes]);
        setMovieAndReviews(movie.data, reviews.data);
      } catch (error) {
        console.error(error.response.data);
        toast.error(error.response.data.error);
      }
    })();
  }, []);

  console.log(reviewState);

  return (
    <div className={`${theme.mode} main`}>
      <ToastContainer />
      <div className="movie-review-area">
        {reviewState.loading ? (
          <Spinner />
        ) : (
          <div className="movie-info">
            <Row>
              <Col sm="3" className="text-center">
                <img
                  src={reviewState.movie.poster}
                  alt={reviewState.movie.name}
                  className="movie-poster"
                />
              </Col>
              <Col sm="9">
                <div className="movie-title">
                  <span className="movie-name">{reviewState.movie.name}</span>
                  <br />
                  <h4>PMDb Rating : {reviewState.movie.rating}</h4>
                  <span>
                    {reviewState.movie.genres}, {reviewState.movie.runtime}
                  </span>
                </div>
                <hr />
                <div className="movie-other-info">
                  <p>
                    <span>Director(s) - {reviewState.movie.directors}</span>
                    <br />
                    <span>Starring - {reviewState.movie.starring}</span>
                    <br />
                  </p>
                  <p>
                    <span>
                      Plot -<br /> {reviewState.movie.plot}
                    </span>
                    <br />
                  </p>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <legend className="text-center">Reviews :</legend>
              <Container>
                {reviewState.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </Container>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
