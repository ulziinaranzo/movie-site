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
import { Access_Token } from "../upcoming/page";
import { StarIcon } from "lucide-react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarWhite } from "../assets/StarWhite";

interface HeaderProps {
  setDarkMode: (prev: boolean) => void;
  darkMode: boolean;
}

export const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const { genres } = useGenres() || { genres: [] }; 
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

      <div className="flex items-center gap-4 text-sm font-medium dark:bg-black bg-white">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="dark:text-white text-black">Genres</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[335px] lg:w-max-[577px] flex flex-col p-5">
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

        <div className="flex relative">
          <img src="/Images/_magnifying-glass.png" className="absolute left-3 top-3 w-4 h-4" />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="w-[97px] pl-10 lg:w-[379px] dark:text-white text-black"
          />
          {showResults && (
            <div className="absolute top-full left-[-140px] mt-1 bg-white dark:bg-[#171717] shadow-lg rounded-b-lg max-h-[400px] overflow-y-auto z-50 lg:w-[577px] w-full p-[12px]">
              {loading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : movies.length > 0 ? (
                movies.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 border-b">
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        className="w-[67px] h-[100px] object-cover rounded mr-3"
                        alt={movie.title || "Movie Poster"}
                      />
                    )}
                    <div className="flex flex-col justify-between gap-[12px] w-full">
                      <div className="flex flex-col">
                        <div className="font-[600] text-[20px] dark:text-white text-black">{movie.title}</div>
                        <div className="lg:w-full flex flex-col">
                          <div className="flex items-center text-sm lg:text-[14px] text-black dark:text-white gap-[5px]">
                            <div className="flex items-center w-[16px] h-[18px]"><StarWhite /></div>
                            
                            {movie.vote_average.toFixed(1)}
                            <span className="text-[13px] text-[#71717A] font-[500] lg:pt-[1px] items-center">/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-sm  dark:text-white text-black">{movie.release_date?.split('-')[0]}</div>
                        <div className="text-[14px] font-[500] flex items-center cursor-pointer dark:text-white text-black">
                          See more <ArrowIcon />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center dark:text-white">No results found</div>
              )}
              <div
                className="text-[14px] font-[500] pt-[10px] pb-[10px] pl-[16px]"
                onClick={() => router.push(`/search?query=${encodeURIComponent(searchValue)}`)} 
              >
                See all results for "{searchValue}"
              </div>
            </div>
          )}
        </div>
      </div>

      <Link href={`/movie/[id]?query=${encodeURIComponent(searchValue)}`} passHref>
        <div className="flex gap-3">
          <img className="w-9 h-9 rounded-xl" src="/Images/Moon.png" onClick={() => setDarkMode(!darkMode)} />
        </div>
      </Link>
      
    </div>
  );
};
