import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";  // Assuming you have a MovieCard component

const API_KEY = "4ab655174f58d5c4383d2b343e357314";
const BASE_URL = "https://api.themoviedb.org/3";

const ActionPage = () => {
  const [movies, setMovies] = useState([]);

  // Fetch movies by Action genre
  const fetchActionMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchActionMovies();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold text-white mb-5">Action Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default ActionPage;
