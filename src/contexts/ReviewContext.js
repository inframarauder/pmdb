import React, { useState, createContext } from "react";

export const ReviewContext = createContext();

const ReviewContextProvider = (props) => {
  const [reviewState, setReviewState] = useState({
    movie: null,
    loading: true,
    reviews: [],
  });

  const setMovieAndReviews = (movie, reviews) => {
    setReviewState({
      ...reviewState,
      loading: false,
      movie: movie,
      reviews: reviews,
    });
  };

  const addReview = (review) => {
    setReviewState({
      ...reviewState,
      reviews: [...reviewState.reviews, review],
    });
  };
  const deleteReview = (id) => {
    setReviewState({
      ...reviewState,
      reviews: reviewState.reviews.filter((review) => review._id !== id),
    });
  };
  const toggleLoading = () => {
    setReviewState({ ...reviewState, loading: !reviewState.loading });
  };
  return (
    <ReviewContext.Provider
      value={{
        reviewState,
        setMovieAndReviews,
        addReview,
        deleteReview,
        toggleLoading,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewContextProvider;
