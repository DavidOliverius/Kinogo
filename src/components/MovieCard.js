import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  return (
    <ImageListItem key={movie.id}>
      <Link
        to={`../movie/${movie.id}`}
        relative="true"
        style={{ textDecoration: "none" }}
      >
        <img
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt={movie.title}
          height="400px"
          loading="lazy"
        />
        <ImageListItemBar
          title={movie.title.slice(0, 30)}
          position="below"
          style={{ color: "white" }}
        />
      </Link>
    </ImageListItem>

    // <div>
    //   {movie.poster_path ? (
    //     <Link to={`../movie/${movie.id}`} relative="true">
    //       <Box>
    //         <img
    //           src={`${IMAGE_PATH}${movie.poster_path}`}
    //           height={"350"}
    //           alt={movie.title}
    //         />
    //       </Box>
    //     </Link>
    //   ) : null}
    //   <div>
    //     <h4 style={{ color: "white" }}>{movie.title}</h4>
    //   </div>
    // </div>
  );
};

export default MovieCard;
