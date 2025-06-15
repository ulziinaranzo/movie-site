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
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const { genres } = useGenres();
  const [totalResults, setTotalResults] = useState<number>(0);

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
        setTotalResults(data.total_results);
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
    <div className="flex w-full max-w-[1440px] mx-auto flex-col pl-[20px] pr-[20px]">
      <div className="text-[30px] lg:text-[24px] font-semibold text-black dark:text-white mb-8">
        Search Filter
      </div>
      <div className="flex flex-col lg:flex-row gap-[10px]">
        <div className="flex flex-col">
          <div className="lg:text-[24px] text-[20px] font-semibold text-black dark:text-white mb-[4px]">
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
              `${totalResults.toString()} titles in "${searchQuery}"`
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
    </div>
  );
}
