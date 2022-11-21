import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function MovieReviewForm(props) {
  const { id } = useParams();
  const [reviewContent, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [reviewTitle, setReviewTitle] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:55000/reviews", {
        // TODO: Add user uid
        reviewTitle: reviewTitle,
        reviewApiID: id,
        reviewContent: reviewContent,
        rating: rating,
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
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            className="form-control"
            id="rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <StarRating />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default MovieReviewForm;
