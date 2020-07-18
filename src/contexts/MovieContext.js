import React, { useState, createContext } from "react";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const [movies, setMovies] = useState([]);

  const resetMovies = (moviesArray) => {
    setMovies(moviesArray);
  };

  return (
    <MovieContext.Provider value={{ movies, resetMovies }}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
