import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const MovieReviewsDisplay = () => {
  const { id } = useParams();
  const [reviews, setReviews] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const BASE_URL =
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_DEV_BASE_URL
      : process.env.REACT_APP_PROD_BASE_URL;

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/reviews/titles/${id}`);
        setReviews(JSON.parse(response.data));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [BASE_URL, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!reviews) return null;
  if (reviews.length === 0) {
    return <h1>No reviews yet!</h1>;
  }

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div key={review._id}>
          <h2>{review.reviewTitle}</h2>
          <div>
            <p>{review.reviewContent}</p>
            <p>
              Review by: <strong>{review.user}</strong>
            </p>
            <Avatar
              alt={review.user}
              src={`https://avatars.dicebear.com/api/initials/:${review.user}.svg?chars=1`}
              variant="rounded"
            />
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">Rating</Typography>
              <Rating
                readOnly
                name="rating"
                id="rating"
                value={review.rating}
                precision={0.5}
              />
            </Box>
            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieReviewsDisplay;
