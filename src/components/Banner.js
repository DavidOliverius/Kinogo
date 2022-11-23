import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Banner = ({ movie }) => {
  return (
    
    <Container
      sx={{
        height: "65%",
        backgroundColor: "grey.800",
      }}
      maxWidth={false}
      disableGutters
    >
      
      {!movie ? (
        <Spinner />
      ) : (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundPosition: "center top",
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
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h4" color="inherit">
                  {movie?.title}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        </Link>
      )}
     
    </Container>
  );
};

export default Banner;
