import React, { useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import { MovieContext } from "../contexts/MovieContext";
import { Container } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const { movies, resetMovies } = useContext(MovieContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://pmdb-api.herokuapp.com/api/movies"
        );

        resetMovies(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={`${theme.mode} main`}>
      <img src="/assets/pmdb-logo.png" className="logo" alt="pmdb-logo" />
      <div className="movies-container">
        <Container>
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
