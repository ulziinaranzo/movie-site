"use client";

import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";
import Link from "next/link";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

export type Movie = {
  vote_average: number;
  id: number;
  genre_ids: number[];
  backdrop_path: "string";
  poster_path: "string";
  title: "string";
  overview: "string";
};

type Response = {
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const getMoviesByAxios = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Response>(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
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

    getMoviesByAxios();
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getPageRange = (currentPage: number, totalPages: number) => {
    const maxVisiblePages = 2;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < maxVisiblePages - 1) {
      if (currentPage - startPage < 2) {
        endPage = Math.min(totalPages, endPage + (maxVisiblePages - (endPage - startPage)));
      } else {
        startPage = Math.max(1, startPage - (maxVisiblePages - (endPage - startPage)));
      }
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange(page, totalPages);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-[20px] lg:px-[80px] pb-[52px] gap-[32px] dark:text-white text-black dark:bg-black bg-white">
      <div className="flex justify-between text-center items-center">
        <h1 className="text-[24px] font-[600] dark:text-white text-black mb-[4px]">
          Upcoming Movies
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col items-center rounded-lg overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-[158px] h-[233px] lg:w-full lg:h-[340px]"
            />
            <div className="bg-[#F4F4F5] w-[157px] h-[76px] lg:w-full lg:h-[99px] p-[8px] flex flex-col">
              <div className="flex items-center text-sm lg:text-[16px] text-black gap-[5px]">
                <StarIcon />
                <b>{movie.vote_average.toFixed(1)}</b>
                <span className="text-[12px] text-[#71717A] font-[500]">
                  /10
                </span>
              </div>
              <div className="text-sm lg:text-[18px] text-black">
                {movie.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center">
        <Pagination aria-label="Movie Pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrev} disabled={page === 1} />
            </PaginationItem>

            {startPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(1)}>1</PaginationLink>
              </PaginationItem>
            )}

            {startPage > 2 && <PaginationEllipsis />}

            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === startPage + index}
                  onClick={() => handlePage(startPage + index)}
                >
                  {startPage + index}
                </PaginationLink>
              </PaginationItem>
            ))}

            {endPage < totalPages - 1 && <PaginationEllipsis />}

            {endPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext onClick={handleNext} disabled={page === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
