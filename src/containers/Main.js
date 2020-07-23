import React, { useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext, MovieContext } from "../contexts/";
import { MovieCard, SearchAndFilter } from "../components/Movies";
import { Spinner } from "../components/Layouts";
import Api from "../Api";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const { movies, fillMovies, toggleLoading } = useContext(MovieContext);
  useEffect(() => {
    (async () => {
      try {
        toggleLoading();
        const { data } = await Api.loadMovies();
        toggleLoading();
        fillMovies(data);
      } catch (error) {
        console.error(error.response.data);
        toast.error(error.response.data.error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`${theme.mode} main`}>
      <ToastContainer />
      <div className="movies-container">
        <legend className="text-center caption">List of movies :</legend>
        <Container>
          <div className="search-filter-area">
            <SearchAndFilter />
          </div>
          {movies.loading ? (
            <Spinner />
          ) : (
            movies.list.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          )}
        </Container>
      </div>
    </div>
  );
};

export default Main;
