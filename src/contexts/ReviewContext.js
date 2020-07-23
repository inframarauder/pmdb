import React, { useState, createContext } from "react";

export const ReviewContext = createContext();

const ReviewContextProvider = (props) => {
  const [reviewState, setReviewState] = useState({
    movie: null,
    loading: false,
    reviews: [],
  });
  const setMovie = (movie) => {
    setReviewState({ ...reviewState, movie: movie });
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
      value={{ reviews, setMovie, addReview, deleteReview, toggleLoading }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewContextProvider;
