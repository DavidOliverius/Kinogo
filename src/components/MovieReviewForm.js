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

  console.log(rating)

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
    // mui component to create a review, rating, and submit button
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-multiline-static"
        label="Review"
        multiline
        rows={4}
        defaultValue="Write your review here"
        onChange={(event) => setReview(event.target.value)}
      />
      <Typography component="legend">Rating</Typography>
      <Rating
        size="large"
        name="rating"
        id="rating"
        value={rating}
        precision={0.5}
        onChange={(event) => setRating(event.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}

//     <Box>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="review"></label>
//           <TextField
//             className="form-control"
//             label="Review"
//             id="reviewContent"
//             rows="3"
//             value={reviewContent}
//             onChange={(event) => setReview(event.target.value)}
//           ></TextField>
//         </div>
//         <Box
//           sx={{
//             "& > legend": { mt: 2 },
//           }}
//         >
//           <Typography component="legend">Rating</Typography>
//           <Rating
//             size="large"
//             name="rating"
//             id="rating"
//             value={rating}
//             precision={0.5}
//             onChange={(event) => setRating(event.target.value)}
//           />
//         </Box>
//         <Button type="submit" variant="contained">
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// }

export default MovieReviewForm;
