import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { MovieContext } from "../contexts/MovieContext";
import { BASE_URL } from "../configs";

const SearchAndFilter = () => {
  const [search, setSearch] = useState("");
  const { movies, resetMovies } = useContext(MovieContext);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${BASE_URL}/movies`, {
        params: { search: search },
      });
      console.log(res.data);
      resetMovies(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search by name,director,cast"
          value={search}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchAndFilter;
