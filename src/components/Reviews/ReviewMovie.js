import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext, AuthContext } from "../../contexts";
import Api from "../../Api";

const ReviewMovie = ({ movie }) => {
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  const [state, setState] = useState({
    userReview: null,
    loading: false,
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    rating: null,
    content: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "rating") {
      e.target.value = Number(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state.userReview) {
        await Api.updateReview(state.userReview._id, formData);
      } else {
        await Api.postReview({ ...formData, movie: movie._id });
      }

      toast.success("Updated!");
      handleClose();
      window.location.reload(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (auth.isLoggedIn) {
          setState({ ...state, loading: true });
          const res = await Api.loadUserMovieReview(movie._id);
          setState({ ...state, userReview: res.data, loading: false });
          setFormData({
            ...formData,
            rating: res.data.rating,
            content: res.data.content,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error(error);
        setState({ ...state, loading: false });
      }
    })();
    //eslint-disable-next-line
  }, []);

  return state.loading ? (
    "Loading"
  ) : (
    <Card className={`${theme.mode} review-movie-card`}>
      <ToastContainer />
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
            <Button variant="secondary" onClick={handleShow}>
              Edit
            </Button>
          </div>
        )}
        {auth.isLoggedIn && !state.userReview && (
          <Button variant="secondary" onClick={handleShow}>
            Write Review
          </Button>
        )}
      </Card.Body>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Review</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Rating:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rate the movie from 1 to 10"
                name="rating"
                value={formData.rating}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Write your review:</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                name="content"
                value={formData.content}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Card>
  );
};

export default ReviewMovie;
