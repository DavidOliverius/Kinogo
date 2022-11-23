import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import MovieCarousel from "../components/MovieCarousel";

const Home = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  // const [searchKey, setSearchKey] = useState("");

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search/movie" : "trending/movie/week";
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
  const randomNum = Math.floor(Math.random() * 19) + 1;
  return (
    <Box height="100%">
      <Banner movie={movies[randomNum]} />
      <MovieCarousel movies={movies.slice(0, 10)} />
      <MovieCarousel movies={movies.slice(10, 21)} />
    </Box>
  );
};

export default Home;
