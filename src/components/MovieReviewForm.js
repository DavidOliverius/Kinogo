import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useAuth } from "../auth/auth-provider";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function MovieReviewForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const uid = user.uid;
  const [reviewContent, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [reviewTitle, setReviewTitle] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:55000/reviews", {
        reviewTitle: reviewTitle,
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

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reviewTitle">Review Title</label>
          <input
            type="text"
            className="form-control"
            id="reviewTitle"
            name="reviewTitle"
            onChange={(event) => setReviewTitle(event.target.value)}
          />

          <label htmlFor="review">Review</label>
          <TextField
            fullWidth
            className="form-control"
            label="Review"
            id="reviewContent"
            rows="3"
            value={reviewContent}
            onChange={(event) => setReview(event.target.value)}
          ></TextField>
        </div>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            id="rating"
            value={rating}
            precision={0.5}
            onChange={(event) => setRating(event.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default MovieReviewForm;
