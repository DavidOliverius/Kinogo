import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  console.log(movie);
  return (
    <Link
      to={`../movie/${movie.id}`}
      relative="true"
    >
      <div>
        {movie.poster_path ? (
          <img
            src={`${IMAGE_PATH}${movie.poster_path}`}
            alt={movie.title}
          />
        ) : null}
        <div>
          <div>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
