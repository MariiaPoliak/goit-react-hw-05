import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzRiMWNjMjgwYmIxMTFkNjZiNjVmMzMxNTYwOGUyOCIsIm5iZiI6MTczMzA1NDU1Ny4zLCJzdWIiOiI2NzRjNTA1ZDU3YTBlNTBhMDVlOGYzZTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PQiYNmC_euxjpChVCg-mng5XFDc97kV6sW5C9vfCuf4`,
            },
          }
        );
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.homePage}>
      <h1>Trending Movies</h1>
      {isLoading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
