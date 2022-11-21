import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => (
        // use review.reviewAuthorID to display the author's name
        <div>
          <h2>{review.reviewTitle}</h2>
          <p>{review.reviewContent}</p>
          <p>{review.reviewAuthorID}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieReviewsDisplay;
