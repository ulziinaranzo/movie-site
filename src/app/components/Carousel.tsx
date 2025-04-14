"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "../assets/StarIcon";
import { PlayIcon } from "../assets/PlayIcon";
import { WhitePlayIcon } from "../assets/WhitePlayIcon";
import Link from "next/link";
import axios from "axios";
import { Access_Token, MovieDetails } from "@/app/components/Types";
import { Skeleton } from "@/components/ui/skeleton";

type Response = {
  results: MovieDetails[];
};

export const Carousel = () => {
  const [index, setIndex] = useState<number>(0);
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [trailerShow, setTrailerShow] = useState<boolean>(false);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      try {
        const popularRes = await axios.get<Response>(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );

        const moviesData = popularRes.data.results.slice(0, 10);
        setMovies(moviesData);

        if (moviesData.length > 0) {
          try {
            const trailerRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${moviesData[0].id}/videos?language=en-US`,
              {
                headers: {
                  Authorization: `Bearer ${Access_Token}`,
                },
              }
            );
            const trailerData = trailerRes.data.results.find(
              (video: any) => video.type === "Trailer"
            );
            setTrailer(trailerData?.key || null);
          } catch (error) {
            console.error("Error fetching trailer:", error);
            setTrailer(null);
          }
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
    if (movies.length > 0) {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }
  };

  const prevButton = () => {
    if (movies.length > 0) {
      setIndex((prevIndex) =>
        prevIndex === 0 ? movies.length - 1 : prevIndex - 1
      );
    }
  };

  const goToSlide = (slideIndex: number) => {
    if (movies.length > 0) {
      setIndex(slideIndex % movies.length);
    }
  };

  if (loading) {
    return (
      <Skeleton className="w-full h-[246px] lg:h-[600px] bg-[#F4F4F5] dark:bg-[#27272A] mb-[52px]" />
    );
  }

  if (movies.length === 0) {
    return <div className="w-full h-[246px] lg:h-[600px] mb-[52px] flex items-center justify-center">
      Failed to load movies
    </div>;
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
              {movies.map((movie, i) => (
                <div key={movie.id} className="relative w-full shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
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
                  className={`h-2 w-2 rounded-full transition-all ${i === index % 3 ? 'bg-white opacity-100' : 'bg-white opacity-30'}`}
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
        <div className="w-full max-w-[375px] lg:max-w-[1040px] p-[20px] lg:p-[40px] lg:absolute lg:top-[60%] lg:left-[50%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
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
              <StarIcon className="flex items-center w-6 h-6 lg:w-[28px] lg:h-[28px] lg:mt-[3px]" />
              <div className="flex items-center text-[16px] lg:text-[18px] font-medium text-black dark:text-white lg:text-white ml-[8px] lg:font-[600] lg:mt-[8px]">
                {movies[index].vote_average.toFixed(1)}
              </div>
              <span className="flex items-center text-[14px] lg:text-[16px] font-regular text-gray-300 ml-[1px] mt-[2px] lg:mt-[7px]">
                /10
              </span>
            </div>
          </div>
          <div className="w-[335px] h-[100px] text-[14px] lg:w-[600px] lg:h-auto lg:text-[16px] text-black dark:text-white lg:text-white mt-2">
            {movies[index].overview}
          </div>
          <button
            className="flex justify-center items-center h-[40px] lg:bg-white bg-black lg:text-black text-white gap-[8px] lg:gap-[4px] rounded-md font-[500] hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors px-[16px] mt-[16px]"
            onClick={(e) => {
              e.preventDefault();
              setTrailerShow(true);
            }}
          >
            <div className="flex ">
              <span className="hidden lg:inline"><PlayIcon /></span>
              <span className="lg:hidden"><WhitePlayIcon /></span>
            </div>
            Watch Trailer
          </button>
        </div>

        {trailerShow && trailer && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            <div className="relative w-[90%] max-w-[997px]">
              <iframe
                width="100%"
                height="561"
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setTrailerShow(false)}
                className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 px-3 py-1 rounded"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};