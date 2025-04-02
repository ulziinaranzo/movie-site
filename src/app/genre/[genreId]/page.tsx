import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Access_Token = "your_access_token_here";

const GenrePage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { genreId } = router.query; 

  useEffect(() => {
    if (genreId) {
      setLoading(true);
      const fetchMoviesByGenre = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=1`,
            {
              headers: {
                Authorization: `Bearer ${Access_Token}`,
              },
            }
          );
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching movies by genre:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMoviesByGenre();
    }
  }, [genreId]); 

  return (
    <div>
      <h1>Movies by Genre</h1>
      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No movies found for this genre.</p>
      )}
    </div>
  );
};

export default GenrePage;
