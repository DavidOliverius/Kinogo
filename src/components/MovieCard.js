import React from 'react';

const MovieCard = ({ movie }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
  console.log(movie);
  return (
    <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {movie.poster_path ? (
        <img
          className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt={movie.title}
        />
      ) : null}
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.title}
        </div>

      </div>
    </div>
  );
};

export default MovieCard;
