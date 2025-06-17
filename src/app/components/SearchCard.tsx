"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { StarIcon } from "../assets/StarIcon";
import { Movie } from "./Types";

type SearchCardProps = {
  loading: boolean;
  movies: Movie[];
};

export const SearchCard = ({ loading, movies }: SearchCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mb-6">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-lg overflow-hidden"
            >
              <Skeleton
                className="w-[157.5px] h-[309.1px] lg:w-[229.73px] lg:h-[439px]"
                style={{ backgroundColor: "#F4F4F5" }}
              />
              <Skeleton
                className="w-[165px] h-[76px] lg:w-full lg:h-[99px] mt-2"
                style={{ backgroundColor: "#F4F4F5" }}
              />
            </div>
          ))
        : movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div
                className="
                  flex flex-col items-center rounded-lg overflow-hidden
                  w-[157.5px] h-[309.1px] lg:w-[229.73px] lg:h-[439px]
                  hover:scale-105 hover:shadow-lg hover:z-10
                  transition-transform duration-300 ease-in-out
                  cursor-pointer
                "
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="object-cover w-full h-[233px] lg:h-[340px]"
                />
                <div className="bg-[#F4F4F5] dark:bg-[#27272A] w-full h-[76px] lg:h-[99px] p-2 flex flex-col justify-center">
                  <div className="flex items-center text-[12px] lg:text-sm text-black dark:text-white gap-1">
                    <StarIcon />
                    <b>{movie.vote_average.toFixed(1)}</b>
                    <span className="text-[#71717A] font-medium text-xs">
                      /10
                    </span>
                  </div>
                  <div className="text-sm lg:text-[18px] text-black dark:text-white mt-1 line-clamp-1">
                    {movie.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};
