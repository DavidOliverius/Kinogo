import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const TMDB = () => {
  const API_URL = 'https://api.themoviedb.org/3';
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? 'search/movie' : 'discover/movie';
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: searchKey,
      },
    });
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  return (
    <div>
      <div className="flex justify-between flex-row bg-gray-100 dark:bg-gray-900">
        <h1 className="font-bold text-7xl items-center justify-center mb-4 text-gray-700 dark:text-gray-200">
          Movies
        </h1>
        <form className="flex gap-3 items-center" onSubmit={searchMovies}>
          <input
            placeholder="Search..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          ></input>
          <button
            className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="">
        <div className="grid gap-4 bg-gray-100 dark:bg-gray-900 grid-cols-4 mx-4">
          {renderMovies()}
        </div>
      </div>
    </div>
  );
};

export default TMDB;
