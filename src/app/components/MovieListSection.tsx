"use client";
import { useEffect, useState } from "react";
import { StarIcon } from "../assets/StarIcon";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieDetails } from "./Types";
import Link from "next/link";
import { StarWhite } from "../assets/StarWhite";
import { PaginationBottom } from "./PaginationBottom";

type Props = {
  title: string;
  apiUrl: string;
};

type Response = {
  results: MovieDetails[];
  total_pages: number;
};

export const MovieListSection = ({ title, apiUrl }: Props) => {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Response>(`${apiUrl}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${process.env.Access_Token}`,
          },
        });
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [apiUrl, page]);

  const handlePage = (pageNum: number) => setPage(pageNum);
  const handlePrev = () => page > 1 && setPage((p) => p - 1);
  const handleNext = () => page < totalPages && setPage((p) => p + 1);

  const getPageRange = (current: number, total: number) => {
    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);
    return { startPage: start, endPage: end };
  };

  const { startPage, endPage } = getPageRange(page, totalPages);

  return (
    <div className="flex flex-col gap-[32px] px-5 lg:px-[80px] pb-[52px] max-w-[1440px] mx-auto w-full">
      {loading ? (
        <Skeleton className="h-6 w-48 bg-[#F4F4F5] dark:bg-[#27272A]" />
      ) : (
        <h1 className="dark:text-white text-black text-[24px] font-bold ">
          {title}
        </h1>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {loading
          ? new Array(10).fill(0).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg"
              >
                <Skeleton className="w-[158px] h-[233px] lg:w-full lg:h-[340px]" />
              </div>
            ))
          : movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div
                  key={movie.id}
                  className="flex flex-col items-center rounded-lg overflow-hidden group hover:scale-[1.02] transition-transform duration-300 "
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[158px] h-[233px] object-cover lg:w-full lg:h-[340px]"
                  />
                  <div className="bg-[#F4F4F5] dark:bg-[#272729] w-[157px] h-[76px] lg:w-full lg:h-[99px] p-2 flex flex-col">
                    <div className="flex items-center text-sm lg:text-base text-black dark:text-white gap-1">
                      <span className="block dark:hidden w-4 h-4">
                        <div className="w-full h-full">
                          <StarIcon />
                        </div>
                      </span>
                      <span className="hidden dark:block w-4 h-4">
                        <StarWhite className="w-full h-full" />
                      </span>
                      <b>{Number(movie.vote_average).toFixed(1)}</b>
                      <span className="text-xs text-[#71717A] mt-[2px]">
                        /10
                      </span>
                    </div>
                    <div className="text-sm lg:text-lg">{movie.title}</div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
      <div className="flex justify-end">
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
};
