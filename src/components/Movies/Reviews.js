import React, { useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext, ReviewContext } from "../../contexts";
import { Spinner } from "../Layouts";
import { BASE_URL } from "../../configs";

const Reviews = ({ match: { params } }) => {
  const { theme } = useContext(ThemeContext);
  const { reviews } = useContext(ReviewContext);

  useEffect(() => {
    (async () => {
      try {
        const movieRes = await axios.get(`${BASE_URL}/movies/${params.id}`);
        const reviewsRes = await axios.get(
          `${BASE_URL}/reviews/movie/${params.id}`
        );
      } catch (error) {
        console.error(error.response.data);
        toast.error(error.response.data.error);
      }
    })();
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Reviews;
