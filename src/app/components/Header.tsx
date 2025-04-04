"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { LineIcon } from "../assets/LineIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GenreIcon } from "../assets/GenreIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import axios from "axios";
import { useGenres } from "../_components/GenreProvider";
import { useRouter, useSearchParams } from "next/navigation";

const Access_Token = "YOUR_ACCESS_TOKEN_HERE";

interface HeaderProps {
  setDarkMode: (prev: boolean) => void;
  darkMode: boolean;
}

export const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const { genres } = useGenres() || { genres: [] }; // Ensure genres is always an array
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const movieListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchMoviesByGenre = async (genreId: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=1`,
        {
          headers: { Authorization: `Bearer ${Access_Token}` },
        }
      );
      setMovies(data.results);
      setShowResults(true);
      movieListRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genreId: number) => {
    router.push(`/search?genre=${genreId}`);
  };

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setShowResults(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        {
          headers: { Authorization: `Bearer ${Access_Token}` },
        }
      );
      setMovies(data.results);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (searchValue) searchMovies(searchValue);
    }, 500);
    return () => clearTimeout(timeoutRef.current);
  }, [searchValue]);

  return (
    <div className="flex w-full justify-between bg-white dark:bg-black py-3 px-5 lg:px-20 relative">
      <Link href="/">
        <img className="w-[92px] h-[20px] mt-2" src="/Images/Logo.png" alt="Logo" />
      </Link>

      <div className="flex items-center gap-4 text-sm font-medium">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="dark:text-white text-black">Genres</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[577px] flex flex-col p-5">
            <div className="text-xl font-semibold text-black dark:text-white">Genres</div>
            <p className="text-sm text-black dark:text-white">See lists of movies by genre</p>
            <div className="mt-4 mb-4"><LineIcon /></div>
            <div className="flex flex-wrap gap-4">
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="outline"
                    className="cursor-pointer bg-white dark:bg-black border-white"
                    onClick={() => handleGenreClick(genre.id)}
                  >
                    {genre.name} <GenreIcon />
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No genres available</p>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <div className="hidden lg:flex relative">
          <img src="/Images/_magnifying-glass.png" className="absolute left-3 top-3 w-4 h-4" />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="pl-10 w-[379px] dark:text-white text-black"
          />
          {showResults && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-[#171717] shadow-lg rounded-b-lg max-h-[400px] overflow-y-auto z-50">
              {loading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : movies.length > 0 ? (
                movies.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 border-b">
                    {movie.poster_path && (
                      <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} className="w-12 h-16 object-cover rounded mr-3" />
                    )}
                    <div>
                      <div className="font-medium dark:text-white">{movie.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{movie.release_date?.split('-')[0]}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center dark:text-white">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <img className="w-9 h-9 rounded-xl" src="/Images/Moon.png" onClick={() => setDarkMode(!darkMode)} />
      </div>
    </div>
  );
};
