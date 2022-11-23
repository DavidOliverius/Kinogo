import React from "react";
import Carousel from "react-multi-carousel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "@mui/material";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieCarousel = ({ movies, carouselTitle }) => {
  return (
    <Box pt="30px" bgcolor="rgb(12, 6, 38)" postion="relative">
      {!movies ? (
        <Spinner />
      ) : (
        <Carousel responsive={responsive} centerMode infinite>
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <Box maxWidth={250}>
                <Card>
                  <CardMedia
                    component="img"
                    alt=""
                    height="300"
                    image={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
                  />
                </Card>
              </Box>
            </Link>
          ))}
        </Carousel>
      )}
      {!!carouselTitle && (
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
            position: "absolute",
            top: -20,
            left: 15,
          }}
        >
          {carouselTitle}
        </Typography>
      )}
    </Box>
  );
};
export default MovieCarousel;