import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieReviewForm from "./MovieReviewForm";


const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!movie) return null;

  // display all the movie information

  return (
    console.log(movie),
    (
      <div>
        <div className="movie-detail">
          <div className="movie-detail__poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movie.title}</h1>
            <p className="movie-detail__tagline">{movie.tagline}</p>
            <p className="movie-detail__overview">{movie.overview}</p>
            <p className="movie-detail__release-date">
              Release Date: {movie.release_date}
            </p>
            <p className="movie-detail__runtime">
              Runtime: {movie.runtime} mins
            </p>
            <p className="movie-detail__genres">
              Genres:
              {movie.genres.map((genre, index) => {
                return index < movie.genres.length - 1
                  ? ` ${genre.name},`
                  : ` ${genre.name}`;
              })}
            </p>
          </div>
        </div>
        <Link to="/">Back to Home</Link>
        <MovieReviewForm />
      </div>
    )
  );
};

export default MovieDetail;
