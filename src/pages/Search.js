import React, { useState } from "react";
import MovieCard from "../components/MovieCard";

const Search = (movie) => {
  const [movies, setMovies] = useState([]);

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  return (
    <div>
      <div>{renderMovies(movie)}</div>
    </div>
  );
};

export default Search;
