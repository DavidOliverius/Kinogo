import React from "react";
import { Slide } from "react-slideshow-image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "react-slideshow-image/dist/styles.css";

const Carousel = ({ movies }) => {
  return (
    <Box bgcolor="#0C0626">
      <Slide
        slidesToScroll={1}
        slidesToShow={6}
        transitionDuration={300}
        autoplay={false}
        cssClass="card-width"
      >
        {movies.map((movie) => (
          <Box maxWidth={200}>
            <Card sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                alt=""
                height="300"
                image={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
              />
            </Card>
          </Box>
        ))}
      </Slide>
    </Box>
  );
};

export default Carousel;
