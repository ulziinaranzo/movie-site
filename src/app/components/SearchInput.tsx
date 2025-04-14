"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StarWhite } from "../assets/StarWhite";
import { ArrowIcon } from "../assets/ArrowIcon";
import { useEffect, useRef, useState } from "react";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  showResults: boolean;
  loading: boolean;
  movies: any[];
  setShowResults: (value: boolean) => void;
  setSearchButton: (value: boolean) => void;
  searchButton: boolean;
}

export const SearchInput = ({
  searchValue,
  setSearchValue,
  showResults,
  loading,
  movies,
  setShowResults,
  setSearchButton,
  searchButton,
}: SearchInputProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowResults]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowResults(value.trim() !== "");
  };

  return (
    <div>
      {!searchButton && (
        <div className="lg:hidden mb-2">
          <img
            className="w-[41px] h-[41px] dark:hidden block"
            src="/Images/Modes(1).png"
            alt="Search Light"
            onClick={() => setSearchButton(true)}
          />
          <img
            className="w-[41px] h-[41px] dark:block hidden"
            src="/Images/Modes.png"
            alt="Search Dark"
            onClick={() => setSearchButton(true)}
          />
        </div>
      )}

      {searchButton && (
        <div className="lg:hidden relative w-full" ref={containerRef}>
          <button
            onClick={() => {
              setSearchButton(false);
              setSearchValue("");
              setShowResults(false);
            }}
            className="absolute left-0 top-[10px] z-10"
          >
            <img
              src="/Images/BackArrow.png"
              alt="Back"
              className="w-6 h-6 ml-2"
            />
          </button>

          {/* Search icons */}
          <img
            src="/Images/glass_black.png"
            className="absolute left-10 top-2.5 w-4 h-4 block dark:hidden"
            alt="Search Icon Light"
          />
          <img
            src="/Images/_magnifying-glass.png"
            className="absolute left-10 top-2.5 w-4 h-4 hidden dark:block"
            alt="Search Icon Dark"
          />

          <Input
            type="text"
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setShowResults(searchValue.trim() !== "")}
            placeholder="Search"
            className="w-full pl-16 dark:text-white text-black"
          />

          {showResults && (
            <SearchResults
              movies={movies}
              loading={loading}
              searchValue={searchValue}
              router={router}
            />
          )}
        </div>
      )}

      <div className="hidden lg:flex relative w-full" ref={containerRef}>
        <img
          src="/Images/glass_black.png"
          className="absolute left-3 top-2.5 w-4 h-4 block dark:hidden"
          alt="Search Icon Light"
        />
        <img
          src="/Images/_magnifying-glass.png"
          className="absolute left-3 top-2.5 w-4 h-4 hidden dark:block"
          alt="Search Icon Dark"
        />

        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setShowResults(searchValue.trim() !== "")}
          placeholder="Search"
          className="w-[97px] pl-10 lg:w-[379px] dark:text-white text-black"
        />

        {showResults && (
          <SearchResults
            movies={movies}
            loading={loading}
            searchValue={searchValue}
            router={router}
          />
        )}
      </div>
    </div>
  );
};

const SearchResults = ({
  movies,
  loading,
  searchValue,
  router,
}: {
  movies: any[];
  loading: boolean;
  searchValue: string;
  router: any;
}) => (
  <div className="absolute lg:top-full lg:left-[-140px] left-[-80px] mt-1 bg-white dark:bg-[#171717] shadow-lg rounded-lg z-50 lg:w-[577px] p-[12px] w-[355px]">
    {loading ? (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex gap-3 border-b pb-3 bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg p-3"
          >
            <Skeleton className="w-[67px] h-[100px] rounded" />
            <div className="flex flex-col justify-between w-full gap-2">
              <Skeleton className="h-6 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-1/3 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    ) : movies.length > 0 ? (
      movies.slice(0, 5).map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="flex p-3 hover:bg-gray-100 dark:hover:bg-gray-800 border-b last:border-none rounded-lg">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                className="w-[67px] h-[100px] object-cover rounded mr-3"
                alt={movie.title || "Movie Poster"}
              />
            )}
            <div className="flex flex-col gap-[12px] w-full">
              <div className="flex flex-col">
                <div className="font-semibold text-[20px] dark:text-white text-black">
                  {movie.title}
                </div>
                <div className="flex items-center text-sm dark:text-white text-black">
                  <span className="mr-1 dark:block hidden">
                    <StarWhite />
                  </span>
                  <img
                    className="mr-1 w-4 h-4 block dark:hidden"
                    src="/Images/Star.png"
                    alt="Star Icon"
                  />
                  {movie.vote_average.toFixed(1)}
                  <span className="text-[#71717A]"> /10</span>
                </div>
              </div>
              <div className="flex justify-between text-sm dark:text-white text-black">
                <div>{movie.release_date?.split("-")[0]}</div>
                <div className="flex items-center gap-1">
                  See more <ArrowIcon />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <div className="p-4 text-center dark:text-white">No results found</div>
    )}

    <div
      className="text-sm font-medium pt-2.5 pb-2.5 pl-4 cursor-pointer dark:text-white text-black"
      onClick={() =>
        router.push(`/search?query=${encodeURIComponent(searchValue)}`)
      }
    >
      See all results for "{searchValue}"
    </div>
  </div>
);
