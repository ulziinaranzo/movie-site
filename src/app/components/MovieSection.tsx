"use client";
import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { WhiteArrowIcon } from "../assets/WhiteArrowIcon"; // Цагаан icon light mode-д
import { StarIcon } from "../assets/StarIcon";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Access_Token, MovieDetails } from "./Types";
import { StarWhite } from "../assets/StarWhite";

type Props = {
  title: string;
  endpoint: string;
  seeMoreLink: string;
};

export const MovieSection = ({ title, endpoint, seeMoreLink }: Props) => {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get<{ results: MovieDetails[] }>(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error(`Error fetching ${title} movies:`, error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [endpoint, title]);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-[20px] lg:px-[80px] pb-[52px] pt-[32px] gap-[32px] dark:bg-black bg-white">
      <div className="flex justify-between items-center">
        {loading ? (
          <>
            <Skeleton className="h-6 w-48 bg-[#F4F4F5] dark:bg-[#27272A] hover:opacity-80 transition-opacity" />
            <Skeleton className="h-4 w-20 bg-[#F4F4F5] dark:bg-[#27272A] hover:opacity-80 transition-opacity" />
          </>
        ) : (
          <>
            <div className="text-[24px] font-[600] dark:text-white text-black mb-[4px] hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              {title}
            </div>
            <div
              className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer dark:text-white text-black hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => router.push(seeMoreLink)}
            >
              See more
              <span className="block dark:hidden">
                <WhiteArrowIcon />
              </span>
              <span className="hidden dark:block">
                <ArrowIcon />
              </span>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
        {loading
          ? new Array(10).fill(0).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg overflow-hidden w-[158px] lg:w-full group"
              >
                <Skeleton className="w-[158px] h-[233px] lg:w-full lg:h-[340px] bg-[#F4F4F5] dark:bg-[#27272A] group-hover:opacity-80 transition-opacity" />
                </div>
            ))
          : movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="flex flex-col items-center rounded-lg overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative w-[158px] h-[233px] lg:w-full lg:h-[340px] overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="object-cover w-full h-full group-hover:brightness-90 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent group-hover:from-black/20 group-hover:via-black/10 transition-all duration-300" />
                  </div>
                  <div className="bg-[#F4F4F5] dark:bg-[#272729] w-[157px] lg:w-full h-[76px] lg:h-[99px] p-[8px] flex flex-col group-hover:bg-[#E5E5E5] dark:group-hover:bg-[#3A3A3A] transition-colors duration-300">
                    <div className="flex items-center text-sm lg:text-[16px] text-black dark:text-white gap-[5px]">
                      <span className="block dark:hidden w-4 h-4">
                                                                <StarIcon className="w-full h-full" />
                                                              </span>
                                                              <span className="hidden dark:block w-4 h-4">
                                                                <StarWhite className="w-full h-full" />
                                                              </span>
                      <b>{movie.vote_average.toFixed(1)}</b>
                      <span className="text-[12px] text-[#71717A] dark:text-white font-[500] mt-[2px]">
                        /10
                      </span>
                    </div>
                    <div className="text-sm lg:text-[18px] text-black dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {movie.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};
