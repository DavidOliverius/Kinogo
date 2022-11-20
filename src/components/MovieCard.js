import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  console.log(movie);
  return (
    <Link to={`id/${movie.id}`}>
      {movie.poster_path ? (
        <img src={`${IMAGE_PATH}${movie.poster_path}`} alt={movie.title} />
      ) : null}
      <div>
        <div>{movie.title}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
