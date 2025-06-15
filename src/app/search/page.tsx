"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useGenres } from "../_components/GenreProvider";
import { Separator } from "@/components/ui/separator";
import { Access_Token, Movie, Response } from "../components/Types";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationBottom } from "../components/PaginationBottom";
import { GenresPage } from "../components/GenresPage";
import { SearchCard } from "../components/SearchCard";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const { genres } = useGenres();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const genreName =
    genres.find((g) => g.id.toString() === genre)?.name || "Unknown";

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
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Response>(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genre}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [genre, page]);

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

        <Separator
          orientation="vertical"
          className="self-stretch w-[1px] h-[1px] bg-gray-200 dark:bg-[#262626]"
        />
        <div className="flex flex-col lg:w-full gap-[32px]">
          <div className="text-[20px] font-semibold text-black dark:text-white">
            {loading ? (
              <Skeleton
                className="w-[200px] h-[24px]"
                style={{ backgroundColor: "#F4F4F5" }}
              />
            ) : (
              `${movies.length} titles in "${genreName}"`
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
};

export default SearchPage;
