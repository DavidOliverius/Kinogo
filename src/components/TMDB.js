import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const TMDB = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search/movie" : "discover/movie";
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
      <div>
        <h1>Movies</h1>
        <form onSubmit={searchMovies}>
          <input
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <div>{renderMovies()}</div>
      </div>
    </div>
  );
};

export default TMDB;
