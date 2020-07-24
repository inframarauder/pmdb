import React, { useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext, ReviewContext } from "../contexts";
import { Spinner } from "../components/Layouts";
import { ReviewCard, ReviewMovie } from "../components/Reviews";
import { Row, Col } from "react-bootstrap";
import Api from "../Api";

const Reviews = ({ match: { params } }) => {
  const { theme } = useContext(ThemeContext);
  const { reviewState, setMovieAndReviews } = useContext(ReviewContext);

  useEffect(() => {
    (async () => {
      try {
        const apiCalls = [
          Api.loadMovieById(params.id),
          Api.loadReviewsByMovieId(params.id),
        ];
        const [movie, reviews] = await Promise.all(apiCalls);

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
      <div className="movie-review-container">
        {loading ? (
          <Spinner />
        ) : (
          <Row>
            <Col sm="4">
              <ReviewMovie movie={movie} />
            </Col>
            <Col sm="8">
              <div className="review-area">
                <legend className="text-center">Reviews :</legend>
                {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Reviews;
