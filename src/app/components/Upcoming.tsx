"use client";

import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";

const API_KEY = "4ab655174f58d5c4383d2b343e357314";
const BASE_URL = "https://api.themoviedb.org/3";

export const Upcoming = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        setMovies(data.results.slice(0, 10)); // Only take the first 10 movies
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    }

    fetchUpcomingMovies();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit p-[20px] lg:p-[80px] gap-[20px] lg:gap-[32px]">
      <div className="flex justify-between items-center">
        <div className="text-[24px] font-[600] text-white mb-[4px]">
          Upcoming
        </div>
        <div className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer text-white">
          See more <ArrowIcon />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
        {movies.map((movie, index) => (
          <div key={index} className="flex flex-col items-center rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-[158px] h-[233px] lg:w-full lg:h-[340px]"
            />

            <div className="bg-[#F4F4F5] w-[157px] h-[76px] lg:w-full lg:h-[99px] p-[8px] flex flex-col">
              <div className="flex items-center text-sm lg:text-[16px] text-black gap-[5px]">
                <StarIcon />
                <b>{movie.vote_average.toFixed(1)}</b>
                <span className="text-[12px] text-[#71717A] font-[500]">/10</span>
              </div>
              <div className="text-sm lg:text-[18px] text-black">{movie.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
