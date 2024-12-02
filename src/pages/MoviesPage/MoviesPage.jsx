import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // отримання значення "query" з параметрів пошуку

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzRiMWNjMjgwYmIxMTFkNjZiNjVmMzMxNTYwOGUyOCIsIm5iZiI6MTczMzA1NDU1Ny4zLCJzdWIiOiI2NzRjNTA1ZDU3YTBlNTBhMDVlOGYzZTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PQiYNmC_euxjpChVCg-mng5XFDc97kV6sW5C9vfCuf4`,
            },
          }
        );
        setMovies(data.results);
      } catch (err) {
        setError("Не вдалося завантажити фільми. Спробуйте ще раз.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.search.value.trim();
    if (searchInput) {
      setSearchParams({ query: searchInput });
    }
  };

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value.trim() })}
          placeholder="Search movies..."
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
