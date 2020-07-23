import React, { useState, createContext, useContext } from "react";
import { AuthContext } from "../contexts";

export const ReviewContext = createContext();

const ReviewContextProvider = (props) => {
  const [reviewState, setReviewState] = useState({
    movie: null,
    loading: true,
    reviews: {
      userReview: null,
      otherReviews: [],
    },
  });

  const { auth } = useContext(AuthContext);

  const setMovieAndReviews = (movie, reviews) => {
    if (auth.isLoggedIn) {
      let userReview = reviews.filter(
        (review) => review.author.username === auth.user.username
      )[0];
      let otherReviews = reviews.filter(
        (review) => review.author.username !== auth.user.username
      );
      setReviewState({
        ...reviewState,
        loading: false,
        movie: movie,
        reviews: {
          userReview: userReview,
          otherReviews: otherReviews,
        },
      });
    } else {
      setReviewState({
        ...reviewState,
        loading: false,
        movie: movie,
        reviews: {
          userReview: null,
          otherReviews: reviews,
        },
      });
    }
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
