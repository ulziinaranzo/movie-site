"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Access_Token, Movie } from "@/app/components/Types";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenres } from "@/app/_components/GenreProvider";
import { PaginationBottom } from "@/app/components/PaginationBottom";
import { GenresPage } from "@/app/components/GenresPage";
import { SearchCard } from "@/app/components/SearchCard";

export default function SearchResultsPage() {
  const { query } = useParams();
  const searchQuery = decodeURIComponent(query as string);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const { genres } = useGenres();

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}&language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, page]);

  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, page + 1);

  return (
    <div className="flex w-full max-w-[1440px] mx-auto flex-col lg:flex-row pl-[20px] pr-[20px] gap-[10px] lg:gap-[20px]">
      <div className="flex flex-col lg:w-[300px]">
        <h1 className="text-[30px] font-semibold text-black dark:text-white mb-8 lg:mb-12">
          Results for “{searchQuery}”
        </h1>
        <div className="text-[24px] font-semibold text-black dark:text-white mb-[4px]">
          Genres
        </div>
        <div className="text-[16px] font-[400] mb-[20px]">
          See lists of movies by genre
        </div>
        <GenresPage genres={genres} selectedGenre={genre} loading={loading} />
      </div>

      <div className="flex flex-col lg:flex-1 gap-[32px]">
        <div className="text-[20px] font-semibold text-black dark:text-white">
          {loading ? (
            <Skeleton
              className="w-[200px] h-[24px]"
              style={{ backgroundColor: "#F4F4F5" }}
            />
          ) : (
            `${movies.length} titles in "${searchQuery}"`
          )}
        </div>
        <SearchCard loading={loading} movies={movies} />
        {!loading && totalPages > 1 && (
          <PaginationBottom
            page={page}
            startPage={startPage}
            endPage={endPage}
            totalPages={totalPages}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handlePage={handlePage}
          />
        )}
      </div>
    </div>
  );
}
