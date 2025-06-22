"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { MovieDetails } from "@/app/components/Types";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieIdTrailer } from "./MovieIdTrailer";
import { CarouselText } from "./CarouselText";
import { CaroulImages } from "./CarouselImages";
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
          <CaroulImages movies={movies} index={index} goToSlide={goToSlide} />
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
        <CarouselText
          movies={movies}
          index={index}
          trailerShow={trailerShow}
          setTrailerShow={setTrailerShow}
        />

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
