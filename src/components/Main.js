import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { ThemeContext } from "../contexts/ThemeContext";
import { MovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import SearchAndFilter from "../components/SearchAndFilter";
import { BASE_URL } from "../configs";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const { movies, resetMovies } = useContext(MovieContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movies`);
        resetMovies(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={`${theme.mode} main`}>
      <div className="movies-container">
        <legend className="text-center caption">List of movies :</legend>
        <Container>
          <div className="search-filter-area">
            <SearchAndFilter />
          </div>
          {movies.length < 0
            ? "Loading"
            : movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
        </Container>
      </div>
    </div>
  );
};

export default Main;
