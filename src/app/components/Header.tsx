"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Genres } from "./Genres";
import { SearchInput } from "./SearchInput";
import { DarkModeToggle } from "./DarkModeToggle";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchButton, setSearchButton] = useState<boolean>(false);

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
        { headers: { Authorization: `Bearer ${process.env.Access_Token}` } }
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
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchValue]);

  return (
    <div className="flex w-[375px] items-center bg-white dark:bg-black py-3 px-5 lg:px-20 relative lg:w-[1440px]">
      <Link href="/">
        {!searchButton && (
          <img
            className="w-[92px] h-[20px] mt-2"
            src="/Images/Logo.png"
            alt="Logo"
          />
        )}
      </Link>

      <div className="flex items-center lg:gap-4 gap-[0px] text-sm font-medium dark:bg-black bg-white ml-auto">
        <Genres />
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showResults={showResults}
          setShowResults={setShowResults}
          loading={loading}
          movies={movies}
          setSearchButton={setSearchButton}
          searchButton={searchButton}
        />
      </div>

      <div className="flex items-center gap-3 ml-3">
        {!searchButton && (
          <button
            onClick={() => setSearchButton(true)}
            className="lg:hidden mt-[2px]"
            aria-label="Open Search"
          >
            <img
              className="w-[41px] h-[41px] block dark:hidden"
              src="/Images/Modes(1).png"
              alt="Search Light"
            />
          </button>
        )}
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};
