import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useAuth } from "../auth/auth-provider";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

function MovieReviewForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const uid = user.uid;
  const [reviewContent, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const BASE_URL =
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_DEV_BASE_URL
      : process.env.REACT_APP_PROD_BASE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/reviews`, {
        reviewApiID: id,
        reviewContent: reviewContent,
        rating: rating,
        reviewAuthorID: uid,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(rating);

  // const handleEdit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .put(`${BASE_URL}/reviews/`, {
  //       reviewContent: reviewContent,
  //       rating: rating,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleDelete = (event) => {
  //   event.preventDefault();
  //   axios
  //     .delete(`${BASE_URL}/reviews`, {
  //       _id: id,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div>
      <h2>Write a review</h2>
      <Paper
        style={{
          padding: "40px 20px",
          marginBottom: 35,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              alt={user.displayName}
              src={`https://avatars.dicebear.com/api/initials/:${user.displayName}.svg?chars=1`}
            />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h3 style={{ margin: 0, textAlign: "left" }}>{user.displayName}</h3>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <Rating
                name="rating"
                id="rating"
                value={rating}
                precision={0.5}
                onChange={(event) => setRating(event.target.value)}
              />
            </Box>
            <Grid container justifyItems="center">
              <Grid item></Grid>
            </Grid>
            <p style={{ textAlign: "left" }}>
              {" "}
              <TextField
                sx={{ backgroundColor: "white" }}
                fullWidth
                id="outlined-multiline-static"
                label="What did you think?"
                multiline
                rows={4}
                onChange={(event) => setReview(event.target.value)}
              />
            </p>

            <p style={{ textAlign: "left", color: "gray" }}>
              {" "}
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={formSubmitted}
              >
                Submit
              </Button>
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default MovieReviewForm;
