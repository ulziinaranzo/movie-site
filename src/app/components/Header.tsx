"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Access_Token } from "../components/Types";
import { Genres } from "./Genres";
import { SearchInput } from "./SearchInput";
import { DarkModeToggle } from "./DarkModeToggle";

export const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchButton, setSearchButton] = useState<boolean>(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) return savedMode === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

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
        { headers: { Authorization: `Bearer ${Access_Token}` } }
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

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className="flex w-full justify-between bg-white dark:bg-black py-3 px-5 lg:px-20 relative lg:w-max-[1440px]">
      <Link href="/">
        {!searchButton && (
          <img className="w-[92px] h-[20px] mt-2" src="/Images/Logo.png" alt="Logo" />
        )}
      </Link>
      <div className="flex items-center gap-4 text-sm font-medium dark:bg-black bg-white">
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
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};
