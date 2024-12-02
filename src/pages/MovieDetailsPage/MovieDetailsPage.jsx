import {
  Outlet,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { defaultImg } from "../../components/Poster/Poster";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzRiMWNjMjgwYmIxMTFkNjZiNjVmMzMxNTYwOGUyOCIsIm5iZiI6MTczMzA1NDU1Ny4zLCJzdWIiOiI2NzRjNTA1ZDU3YTBlNTBhMDVlOGYzZTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PQiYNmC_euxjpChVCg-mng5XFDc97kV6sW5C9vfCuf4";

  const from = location.state?.from || "/movies";

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError("Не вдалося завантажити дані про фільм.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Інформація недоступна.</p>;
  }

  return (
    <div className={styles.containerMovie}>
      {/* кнопка */}
      <button className={styles.goBackButton} onClick={() => navigate(from)}>
        Go back
      </button>
      <h2>{movie.title}</h2>

      <div className={styles.movieDetailsContent}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg // Use defaultImg
          }
          alt={movie.title}
          className={styles.posterDefault}
        />

        <div className={styles.overview}>
          <p>{movie.overview}</p>
        </div>
      </div>

      <nav>
        <Link to="cast" state={{ from }}>
          Movie Cast
        </Link>{" "}
        |
        <Link to="reviews" state={{ from }}>
          Movie Reviews
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
