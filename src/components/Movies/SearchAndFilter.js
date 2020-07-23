import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { MovieContext } from "../../contexts";
import { BASE_URL } from "../../configs";

const SearchAndFilter = () => {
  const [search, setSearch] = useState("");
  const { fillMovies, toggleLoading } = useContext(MovieContext);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toggleLoading();
      const res = await axios.get(`${BASE_URL}/movies`, {
        params: { search: search },
      });
      toggleLoading();
      fillMovies(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Row>
        <Col sm="9">
          <Form.Control
            type="text"
            placeholder="Search by name,genre,year,director,cast"
            value={search}
            onChange={(e) => handleChange(e)}
          />
        </Col>
        <Col sm="3" id="searchBtnCol">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchAndFilter;
