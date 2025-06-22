"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "../assets/StarIcon";
import { PlayIcon } from "../assets/PlayIcon";
import { WhitePlayIcon } from "../assets/WhitePlayIcon";
import Link from "next/link";
import axios from "axios";
import { MovieDetails } from "@/app/components/Types";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieIdTrailer } from "./MovieIdTrailer";

type Response = {
  results: MovieDetails[];
};

export const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [trailerShow, setTrailerShow] = useState(false);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      try {
        const popularRes = await axios.get<Response>(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${process.env.Access_Token}`,
            },
          }
        );

        const moviesData = popularRes.data.results.slice(0, 10);
        setMovies(moviesData);

        if (moviesData.length > 0) {
          const trailerRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${moviesData[0].id}/videos?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${process.env.Access_Token}`,
              },
            }
          );
          const trailerData = trailerRes.data.results.find(
            (video: any) => video.type === "Trailer"
          );
          setTrailer(trailerData?.key || null);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getMoviesByAxios();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  const nextButton = () => {
    setIndex((prev) => (prev + 1) % movies.length);
  };

  const prevButton = () => {
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex % movies.length);
  };

  if (loading) {
    return (
      <Skeleton className="w-full h-[246px] lg:h-[600px] bg-[#F4F4F5] dark:bg-[#27272A] mb-[52px]" />
    );
  }

  if (movies.length === 0) {
    return (
      <div className="w-full h-[246px] lg:h-[600px] mb-[52px] flex items-center justify-center">
        Failed to load movies
      </div>
    );
  }

  return (
    <div className="w-full h-fit flex flex-col items-center mb-[52px]">
      <div className="relative w-full">
        <Link href={`/movie/${movies[index].id}`}>
          <div className="relative overflow-hidden w-[375px] h-fit lg:w-full lg:h-[600px]">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {movies.map((movie) => (
                <div key={movie.id} className="relative w-full shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      movie.backdrop_path || movie.poster_path
                    }`}
                    className="h-[246px] w-full lg:h-[600px] object-cover"
                    alt={movie.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              {movies.slice(0, 3).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSlide(i);
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === index % 3
                      ? "bg-white opacity-100"
                      : "bg-white opacity-30"
                  }`}
                />
              ))}
            </div>
          </div>
        </Link>
        <button
          onClick={prevButton}
          className="hidden lg:flex justify-center items-center absolute left-[44px] top-1/2 transform -translate-y-1/2 bg-white p-[12px] text-black rounded-full h-[40px] w-[40px] z-10"
        >
          ❮
        </button>
        <button
          onClick={nextButton}
          className="hidden lg:flex justify-center items-center absolute right-[44px] top-1/2 transform -translate-y-1/2 bg-white p-[12px] text-black rounded-full h-[40px] w-[40px] z-10"
        >
          ❯
        </button>

        <div
          className="
            w-full max-w-[375px] p-[20px] 
            lg:max-w-[1040px] lg:p-[40px] 
            lg:absolute lg:top-[60%] lg:left-[50%] 
            lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 
            lg:rounded-lg
            "
          style={{ pointerEvents: trailerShow ? "none" : "auto" }}
        >
          <div className="flex justify-between lg:flex-col">
            <div className="flex flex-col">
              <div className="text-[14px] lg:text-[16px] lg:text-white text-black font-regular">
                Now Playing:
              </div>
              <div className="text-[24px] lg:text-[36px] lg:text-white text-black dark:text-white font-semibold">
                {movies[index].title}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 lg:w-[32px] lg:h-[32px] lg:mt-[20px]">
                <img src="/Images/star.png" />
              </div>

              <div className="flex items-center text-[16px] lg:text-[18px] font-medium text-black dark:text-white lg:text-white ml-[0px] lg:font-[600] lg:mt-[15px]">
                {movies[index].vote_average.toFixed(1)}
              </div>
              <span className="flex items-center text-[14px] lg:text-[16px] font-regular text-gray-300 ml-[1px] mt-[2px] lg:mt-[14px]">
                /10
              </span>
            </div>
          </div>
          <div className="w-[335px] h-[100px] text-[14px] lg:w-[600px] lg:h-auto lg:text-[16px] text-black dark:text-white lg:text-white mt-2">
            {movies[index].overview}
          </div>
          <button
            className="flex justify-center items-center h-[40px] bg-black text-white lg:bg-white lg:text-black gap-[8px] rounded-md font-[500] hover:bg-gray-800 lg:hover:bg-gray-200 transition-colors px-[16px] mt-[16px]"
            onClick={(e) => {
              e.preventDefault();
              setTrailerShow(true);
            }}
          >
            <span className="hidden lg:inline">
              <PlayIcon />
            </span>
            <span className="lg:hidden">
              <WhitePlayIcon />
            </span>
            Watch Trailer
          </button>
        </div>

        {trailerShow && trailer && (
          <MovieIdTrailer
            trailerShow={trailerShow}
            setTrailerShow={setTrailerShow}
            trailer={trailer}
          />
        )}
      </div>
    </div>
  );
};
