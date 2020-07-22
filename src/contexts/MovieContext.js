import React, { useState, createContext } from "react";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const [movies, setMovies] = useState({ loading: false, list: [] });

  const fillMovies = (moviesArray) => {
    setMovies({ ...movies, list: moviesArray });
  };

  const toggleLoading = () => {
    setMovies({ ...movies, loading: !movies.loading });
  };

  return (
    <MovieContext.Provider value={{ movies, fillMovies, toggleLoading }}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
