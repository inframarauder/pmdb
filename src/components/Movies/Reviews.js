import React, { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../configs";

const Reviews = ({ match: { params } }) => {
  useEffect(() => {
    (async () => {
      try {
        const movieRes = await axios.get(`${BASE_URL}/movies/${params.id}`);
        const reviewsRes = await axios.get(
          `${BASE_URL}/reviews/movie/${params.id}`
        );
        console.log("Movie", movieRes.data);
        console.log("Reviews", reviewsRes.data);
      } catch (error) {
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
