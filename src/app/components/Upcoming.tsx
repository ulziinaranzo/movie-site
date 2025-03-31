"use client";

import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";
import Link from "next/link";
import axios from "axios";

const Access_Token =
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
};
export const UpComing = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      try {
        const { data } = await axios.get<Response>(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMoviesByAxios();

    return () => {};
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-[20px] lg:px-[80px] pb-[52px] gap-[32px] dark:text-white text-black dark:bg-black bg-white">
      <div className="flex justify-between text-center items-center">
        <div className="flex text-[24px] font-[600] dark:text-white text-black mb-[4px]">
          Upcoming Movies
        </div>
        <Link href={"/upcomingMovies"}>
          <div className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer dark:text-white text-black">
            See more <ArrowIcon />
          </div>
        </Link>
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
    </div>
  );
};
