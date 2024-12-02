import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";
import { defaultImg } from "../../components/Poster/Poster";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.movieLink}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : defaultImg // дефолтний постер
              }
              alt={movie.title}
              className={styles.moviePoster}
            />
            <p className={styles.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
