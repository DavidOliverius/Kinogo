import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

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
  const filteredMovies = movies.filter((movie) => movie.poster_path !== null);

  return (
    <Box
      pt="30px"
      bgcolor="rgb(12, 6, 38)"
      postion="relative"
      maxWidth={"xl"}
      marginLeft={"auto"}
      marginRight={"auto"}
    >
          {!!carouselTitle && (
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
         
            top: -20,
            left: 15,
            marginBottom: 2
          }}
        >
          {carouselTitle}
        </Typography>
      )}
      {!filteredMovies ? (
        <Spinner />
      ) : (
        <Carousel responsive={responsive} centerMode infinite>
          {filteredMovies.map((movie) => (
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
  
    </Box>
  );
};
export default MovieCarousel;
