import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzRiMWNjMjgwYmIxMTFkNjZiNjVmMzMxNTYwOGUyOCIsIm5iZiI6MTczMzA1NDU1Ny4zLCJzdWIiOiI2NzRjNTA1ZDU3YTBlNTBhMDVlOGYzZTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PQiYNmC_euxjpChVCg-mng5XFDc97kV6sW5C9vfCuf4";

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        setError("Не вдалося завантажити каст.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/200x300"
            }
            alt={actor.name}
          />
          <p>{actor.name}</p>
          <p>Роль: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
