"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchInputProps } from "./Types";
import { SearchResults } from "./SearchResults";

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
        <div className="flex lg:hidden mb-2">
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
            className="absolute left-0 top-[2px] z-10 w-8 h-8"
            aria-label="Close Search"
          >
            ✕
          </button>

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
            className="lg:w-full w-[251px] lg:pl-16 pl-10 dark:text-white text-black pl-[65px] pb-[5px]"
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

      <div
        className="hidden lg:flex relative w-full lg:mr-[350px]"
        ref={containerRef}
      >
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
