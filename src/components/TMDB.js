import { Container, ImageList, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
    <Container>
      <div>
        <Container maxWidth={"sm"} sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            fullWidth
            sx={{ backgroundColor: "white" }}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchMovies(e)}
          />
        </Container>
        
        
      </div>

      <ImageList sx={{ width: "100%", height: "100%" }} cols={4}>
        {renderMovies()}
      </ImageList>
    </Container>
  );
};

export default TMDB;
