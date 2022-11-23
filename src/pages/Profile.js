import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/auth-provider";
import axios from "axios";
import Rating from "@mui/material/Rating";
import TimeAgo from "javascript-time-ago";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Spinner from "../components/Spinner";
import Avatar from "@mui/material/Avatar";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [reviews, setReviews] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const username = user.displayName;

  const BASE_URL =
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_DEV_BASE_URL
      : process.env.REACT_APP_PROD_BASE_URL;

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(
          `${BASE_URL}/reviews/authors/${id}`
        );

        setReviews(JSON.parse(reviewsResponse.data));
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

  return (
    <Container
      sx={{
        height: "35%",
        backgroundColor: "grey.400",
      }}
      disableGutters
      maxWidth={"xl"}
      marginLeft={"auto"}
      marginRight={"auto"}
    >
      <Paper
        sx={{
          backgroundColor: "grey.400",
          color: "#fff",
          mb: 4,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt={username}
            src={`https://avatars.dicebear.com/api/initials/:${username}.svg?chars=1`}
          />
          <Typography
            component="h1"
            variant="h4"
            color="inherit"
            textAlign="center"
            mt="20px"
          >
            {username}
          </Typography>
        </Box>
      </Paper>
      <Grid container flex flexDirection="column" alignItems="center">
        <Grid item>
          <Box
            sx={{
              p: { xs: 3, md: 6 },
            }}
          >
            {reviews.length > 0 && (
              <Typography
                component="h1"
                variant="h4"
                color="white"
                textAlign="center"
                sx={{ marginBottom: "30px" }}
              >
                My Reviews
              </Typography>
            )}
          </Box>

          {reviews.length > 0 &&
            reviews.map((review) => (
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
                    <h3 style={{ margin: 0, textAlign: "left" }}>
                      {review.user}
                    </h3>
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
                      posted{" "}
                      {new TimeAgo("en-US").format(new Date(review.createdAt))}
                    </p>
                  </Grid>
                </Grid>
              </Paper>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
