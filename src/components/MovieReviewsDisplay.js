import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

TimeAgo.addDefaultLocale(en);

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

  if (loading) return <Spinner />;
  if (error) return <div>Error!</div>;
  if (!reviews) return null;
  if (reviews.length === 0) {
    return <h2 style={{ color: "white" }}>No reviews yet!</h2>;
  }

  reviews.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div>
      <h2 style={{ color: "white" }}>Reviews</h2>
      {reviews.map((review) => (
        <Paper
          style={{
            padding: "40px 40px",
            marginBottom: 35,
            backgroundColor: "#f5f5f5",
            maxWidth: 600,
            minWidth: 600,
            bgcolor: "background.paper",
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
                alt={review.user}
                src={`https://avatars.dicebear.com/api/initials/:${review.user}.svg?chars=1`}
              />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h3 style={{ margin: 0, textAlign: "left" }}>{review.user}</h3>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                <Rating value={review.rating} readOnly precision={0.5} />
              </Box>
              <Grid container justifyItems="center">
                <Grid item></Grid>
              </Grid>
              <p style={{ textAlign: "left" }}>{review.reviewContent} </p>

              <p style={{ textAlign: "left", color: "gray" }}>
                posted {new TimeAgo("en-US").format(new Date(review.createdAt))}
              </p>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default MovieReviewsDisplay;
