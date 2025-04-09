"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "../assets/StarIcon";
import { PlayIcon } from "../assets/PlayIcon";
import Link from "next/link";
import axios from "axios";
import { Access_Token } from "../upcoming/page";

type Movie = {
  vote_average: number;
  id: number;
  poster_path: string;
  title: string;
  overview: string; 
};

type Response = {
  results: Movie[];
};

export const Carousel = () => {
  const [index, setIndex] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      try {
        const { data } = await axios.get<Response>(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [movies]);

  const nextButton = () => {
    setIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const prevButton = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="w-full flex flex-col items-center mb-[52px]">
      {movies.length > 0 && (
        <Link href={`/movie/${movies[index].id}`}>
          <div className="relative overflow-hidden w-[375px] h-fit lg:w-full lg:h-[600px]">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {movies.map((movie, i) => (
                <div key={i} className="relative w-full shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="h-[246px] w-full lg:h-[600px] object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={prevButton}
              className="hidden lg:flex justify-center items-center absolute left-[44px] top-1/2 transform -translate-y-1/2 bg-white p-[12px] text-black rounded-full h-[40px] w-[40px]"
            >
              ❮
            </button>
            <button
              onClick={nextButton}
              className="hidden lg:flex justify-center items-center absolute right-[44px] top-1/2 transform -translate-y-1/2 bg-white p-[12px] text-black rounded-full h-[40px] w-[40px]"
            >
              ❯
            </button>
          </div>
          <div className="w-full max-w-[375px] lg:max-w-[1040px] p-[20px] lg:p-[40px] lg:absolute top-60 left-130">
            <div className="flex justify-between lg:flex-col">
              <div className="flex flex-col">
                <div className="text-[14px] lg:text-[16px] text-white font-regular">
                  Now Playing:
                </div>
                <div className="text-[24px] lg:text-[36px] text-white font-semibold">
                  {movies[index].title}
                </div>
              </div>

              <div className="flex">
                <div className="w-6 h-6 lg:w-[10px] lg:h-[10px] lg:mt-[3px]">
                  <StarIcon />
                </div>
                <div className="text-[16px] lg:text-[18px] font-medium text-white ml-[8px] lg:font-[600] text-[white] lg:text-[white]">
                  {movies[index].vote_average.toFixed(1)}
                </div>
                <span className="text-[14px] lg:text-[16px] font-regular text-[#71717A] mt-[1px] ml-[1px] lg:mt-0.5 ">
                  /10
                </span>
              </div>
            </div>
            <div className="w-[335px] h-[100px] text-[14px] lg:w-[302px] justrify-between lg:h-auto lg:text-[16px]text-white mt-2 lg:max-w-302 text-[white] lg:text-[white]">
              {movies[index].overview} 
            </div>
            <button className="flex justify-center items-center w-[145px] h-[40px] text-black lg:text-black bg-white gap-[8px] mt-4 rounded-md font-[500]">
              <PlayIcon /> Watch Trailer
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};