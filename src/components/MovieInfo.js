import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/auth-provider";
import MovieCarousel from "./MovieCarousel";
import MovieReviewForm from "./MovieReviewForm";
import MovieReviewsDisplay from "./MovieReviewsDisplay";

const MovieDetail = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();

  const [movie, setMovie] = React.useState(null);
  const [recommendations, setRecommendations] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  React.useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
            },
          }
        );
        setRecommendations(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!movie) return null;

  console.log(recommendations);

  // display all the movie information

  return (
    <Box
      height="100%"
      position="relative"
      maxWidth={"xl"}
      marginLeft={"auto"}
      marginRight={"auto"}
    >
      <Box
        sx={{
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`,
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          background:
            "linear-gradient(to right, rgba(12, 6, 38, 1), rgba(12, 6, 38, 0.5))",
          height: "100%",
          width: "100%",
          top: 0,
        }}
      ></Box>
      <Box
        sx={{
          minWidth: 275,
          maxWidth: "40%",
          position: "absolute",
          top: 80,
          left: 40,
        }}
      >
        <Typography
          variant="h2"
          component="div"
          color="white"
          fontWeight="bold"
        >
          {movie.title} ({movie.release_date.slice(0, 4)})
        </Typography>
        <Typography variant="h5" component="div" color="white">
          {movie.genres.map((genre, index) => {
            return index < movie.genres.length - 1
              ? ` ${genre.name},`
              : ` ${genre.name}`;
          })}
        </Typography>
        <Typography variant="body1" component="div" color="white">
          {movie.runtime} mins
        </Typography>
        <Card
          sx={{ mt: "100px", bgcolor: "transparent", padding: "0px" }}
          elevation={0}
        >
          <CardContent sx={{ padding: 0 }}>
            <Typography
              variant="h5"
              component="div"
              color="white"
              sx={{ fontStyle: "italic" }}
            >
              Synopsis
            </Typography>
            <Typography variant="body1" color="white" marginTop="20px">
              {movie.overview}
            </Typography>
          </CardContent>
          {isLoggedIn ? (
            <div>
              <Button
                sx={{ marginTop: "50px" }}
                onClick={handleOpen}
                variant="contained"
              >
                Write Review
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <MovieReviewForm />
              </Modal>
            </div>
          ) : null}
        </Card>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {recommendations?.results.length > 0 && (
          <MovieCarousel
            movies={!!recommendations && recommendations.results.slice(0, 10)}
            carouselTitle="Recommendations"
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",

          
        }}
      >
        <MovieReviewsDisplay />
      </Box>
    </Box>
  );

  // return (
  //   <div>
  //     <div className="movie-detail">
  //       <div className="movie-detail__poster">
  //         <img
  //           src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
  //           alt={movie.title}
  //         />
  //       </div>
  //       <div className="movie-detail__info">
  //         <h1 className="movie-detail__title">
  //           {movie.title} ({movie.release_date.slice(0, 4)})
  //         </h1>
  //         <p className="movie-detail__tagline">{movie.tagline}</p>
  //         <p className="movie-detail__overview">{movie.overview}</p>
  //         <p className="movie-detail__release-date">
  //           Release Date: {movie.release_date}
  //         </p>
  //         <p className="movie-detail__runtime">Runtime: {movie.runtime} mins</p>
  //         <p className="movie-detail__genres">
  //           Genres:
  //           {movie.genres.map((genre, index) => {
  //             return index < movie.genres.length - 1
  //               ? ` ${genre.name},`
  //               : ` ${genre.name}`;
  //           })}
  //         </p>
  //       </div>
  //     </div>
  //     <Link to="/">Back to Home</Link>
  //     {user && <MovieReviewForm />}
  //     <MovieReviewsDisplay />
  //   </div>
  // );
};

export default MovieDetail;
