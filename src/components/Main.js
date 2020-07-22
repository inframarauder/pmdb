import React, { useState, useEffect, useContext } from "react";
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/movies`);
        for (var movie of data) {
          try {
            const { data } = await axios.get(
              `${BASE_URL}/movies/${movie._id}/avg_rating`
            );

            console.log(data.avgRating);
            movie.rating =
              data.avgRating > 0
                ? data.avgRating
                : Math.floor(Math.random() * 10);
          } catch (error) {
            console.log(error);
          }
        }
        resetMovies(data);
        setLoading(false);
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
          {loading
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
