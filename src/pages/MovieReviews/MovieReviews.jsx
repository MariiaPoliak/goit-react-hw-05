import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzRiMWNjMjgwYmIxMTFkNjZiNjVmMzMxNTYwOGUyOCIsIm5iZiI6MTczMzA1NDU1Ny4zLCJzdWIiOiI2NzRjNTA1ZDU3YTBlNTBhMDVlOGYzZTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PQiYNmC_euxjpChVCg-mng5XFDc97kV6sW5C9vfCuf4";

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        setError("Не вдалося завантажити рецензії.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
