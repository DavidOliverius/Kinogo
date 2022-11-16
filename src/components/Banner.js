import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Banner = ({ movie }) => {
  return (
    <Grid container height="100%">
      <Grid item xs={12} height="70%">
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`,
            height: "100%",
          }}
        >
          {
            <img
              style={{ display: "none" }}
              src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
              alt={movie?.title}
            />
          }
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
              height: "100%",
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Banner;
