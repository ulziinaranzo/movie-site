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

const type = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Flim-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

interface HeaderProps {
  setDarkMode: (prev: boolean) => void;
  darkMode: boolean;
}

const Access_Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

export const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${Access_Token}`,
          },
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchMovies(searchValue);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (searchValue) {
        searchMovies(searchValue);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchValue]);

  return (
    <div className="flex w-full justify-between m-0 h-fit dark:bg-black bg-white py-[11.5px] px-5 lg:px-20 relative">
      <Link href={"/"}>
        <img className="w-[92px] h-[20px] mt-[10px]" src="/Images/Logo.png" />
      </Link>

      <div className="flex justify-center items-center gap-[12px] text-[14px] font-medium">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="dark:text-white text-black">
              Genres
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[577px] flex flex-col p-[20px]">
            <div className="text-[24px] font-[600] text-[#09090B]">Genres</div>
            <div className="text-[16px] font-[400] dark:text-white text-black">
              See lists of movies by genre
            </div>
            <div className="mt-[16px] mb-[16px]">
              <LineIcon />
            </div>
            <div className="flex flex-wrap w-[537px] gap-[16px] dark:bg-[#171717] dark:text-white bg-white text-black">
              {type.map((item, index) => {
                return (
                  <Badge
                    variant="outline"
                    key={index}
                    className="cursor-pointer bg-white dark:bg-black border-white"
                  >
                    {item}
                    <GenreIcon />
                  </Badge>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        <div className="hidden lg:flex relative">
          <img
            src="/Images/_magnifying-glass.png"
            className="hidden lg:flex absolute left-3 top-3 w-[16px] h-[16px]"
          />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchValue && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            placeholder="Search"
            className="pl-[30px] w-[379px] dark:text-white text-black"
          />
          {showResults && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-[#171717] shadow-lg rounded-b-lg max-h-[400px] overflow-y-auto z-50">
              {loading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : movies.length > 0 ? (
                movies.map((movie) => (
                  <Link 
                    key={movie.id} 
                    href={`/movie/${movie.id}`}
                    className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                  >
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded mr-3"
                      />
                    )}
                    <div>
                      <div className="font-medium dark:text-white">{movie.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {movie.release_date?.split('-')[0]}
                      </div>
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

      <div className="flex gap-[12px]">
        <img
          className="lg:hidden w-[36px] h-[36px] rounded-xl"
          src="/Images/Search.png"
        />
        <img
          className="w-[36px] h-[36px] rounded-xl"
          src="/Images/Moon.png"
          onClick={() => setDarkMode(!darkMode)}
          alt={darkMode ? "Dark mode" : "Light Mode"}
        />
      </div>
    </div>
  );
};