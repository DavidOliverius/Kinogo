import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";

const Home = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  // const [searchKey, setSearchKey] = useState("");

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

  //   const renderMovies = () =>
  //     movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  // const searchMovies = (e) => {
  //   e.preventDefault();
  //   fetchMovies(searchKey);
  // };
  return (
    <>
      <Banner movie={movies[Math.floor(Math.random() * 20) + 1]} />
      <Carousel movies={movies.slice(0, 10)} />
      <Carousel movies={movies.slice(10, 21)} />
    </>
  );
};

export default Home;
