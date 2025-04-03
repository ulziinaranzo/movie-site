"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { StarWhite } from "@/app/assets/StarWhite";
import { StarIcon } from "lucide-react";
import { ArrowIcon } from "@/app/assets/ArrowIcon";
import Link from "next/link";
import { PlayIconTrailer } from "@/app/assets/PlayIconTrailer";



type Params = { id: string };
type MovieDetails = {
  adult: boolean;
  title: string;
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: string;
  vote_average: string;
  genres: { name: string }[];
};

type Credits = {
  director: string | null;
  writers: string | null;
  cast: string | null;
};
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
type Video = {
  key: string;
  type: string;
}
const Access_Token =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

const formatRunTime = (runtime: string) => {
  const runtimeNumber = parseInt(runtime, 10);
  if (!runtimeNumber) return "N/A";
  const hours = Math.floor(runtimeNumber / 60);
  const minutes = runtimeNumber % 60;
  return `${hours}h ${minutes}m`;
};

const MoviePage = () => {
  const { id } = useParams<Params>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [movieCertification, setMovieCertification] = useState<string | null>("N/A");
  const [trailer, setTrailer] = useState<string | null>(null);
  const [trailerShow, setTrailerShow] = useState<boolean>(false); 
  const [similarMovie, setSimilarMovie] = useState<Movie[]>([])

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setCredits({
          director: data.crew?.find((person) => person.job === "Director")?.name || "N/A",
          writers: data.crew
            ?.filter((person) => person.job === "Writer")
            .map((person) => person.name)
            .join(", ") || "N/A",
          cast: data.cast?.slice(0, 5).map((person) => person.name).join("   ·  ") || "N/A",
        });
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    const fetchMovieCertif = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/release_dates`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        const usRelease = data.results.find((item) => item.iso_3166_1 === "US");
        const certification = usRelease?.release_dates[0]?.certification || "N/A";
        setMovieCertification(certification);
      } catch (error) {
        console.error("Error fetching movie certification:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        const trailerData = data.results.find((video: Video) => video.type === "Trailer");
        if (trailerData) {
          setTrailer(trailerData.key);
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setSimilarMovie(data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
      fetchMovieCredits();
      fetchMovieCertif();
      fetchMovieTrailer();
      fetchSimilarMovies();
    }
  }, [id]);

  if (!movieDetails || !credits) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="w-[1440px] h-fit m-auto">
      <div className="flex flex-col dark:bg-black bg-white lg:pl-[180px] lg:pr-[180px] lg:pt-[52px] lg:pb-[113px]">
        <div className="flex justify-between gap-[4px] mb-[24px]">
          <div className="flex flex-col">
            <div className="font-[700px] text-[36px] text-white">{movieDetails.title}</div>
            <div className="font-[400px] text-[18px] text-white">
              {movieDetails.release_date} · {movieCertification} · {formatRunTime(movieDetails.runtime)}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[12px] text-white font-[500]">Rating</div>
            <div className="flex gap-[2px]">
              <div className="h-[48px] w-[28px]">
                <StarWhite />
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div className="font-[400] text-[16px] text-white">{Number(movieDetails.vote_average).toFixed(1)}</div>
                  <div className="font-[300] text-[14px] text-[#A1A1AA] mt-[2px]">
                    /10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[32px] mb-[32px] relative">
          <img
            className="w-[290px] h-[428px]"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <img
            className="w-[760px] h-[428px]"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
          />
          {!trailerShow && (
            <button
              className="flex items-center gap-[12px] absolute bottom-[10%] right-[55%] text-white text-[16px]"
              onClick={() => setTrailerShow(true)}
            ><PlayIconTrailer />
               Play Trailer
            </button>
          )}
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[12px]">
            {movieDetails.genres.map((item, index) => (
              <Badge key={index} variant="outline" className="text-white">
                {item.name}
              </Badge>
            ))}
          </div>
          <div className="font-normal w-[1080px] h-[48px] text-white">
            {movieDetails.overview}
          </div>
          <div className="flex gap-[53px]">
            <div className="flex flex-col mt-[20px]">
              <div className="flex">
                <div className="font-bold text-[16px] text-[white] w-64 mb-[6px]">Director</div>
                <div className="text-[16px] font-[400] text-white">{credits.director}</div>
              </div>
              <img src="/Images/Separator.png" className="w-[1080px] h-[6px]" />
              <div className="flex">
                <div className="font-bold text-[16px] text-[white] w-64 mb-[6px]">Writers</div>
                <div className="text-[16px] font-[400] text-white">{credits.writers}</div>
              </div>
              <img src="/Images/Separator.png" className="w-[1080px] h-[6px]" />
              <div className="flex">
                <div className="font-bold text-[16px] text-[white] w-64 mb-[6px]">Stars</div>
                <div className="text-[16px] font-[400] text-white">{credits.cast} </div>
              </div>
              <img src="/Images/Separator.png" className="w-[1080px] h-[6px]" />
            </div>
          </div>
        </div>
        {trailerShow && trailer && (
          <div className="absolute top-45 left-160">
            <iframe
              width="997"
              height="561"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer"
            />
          </div>
        )}
        <div className="flex justify-between text-center items-center">
                <div className="flex text-[24px] font-[600] dark:text-white text-black  mt-[32px] mb-[36px]">
                  More like this
                </div>
                <Link href={"/upcoming"}>
                  <div className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer dark:text-white text-black"  onClick={() => {router.push("/upcoming")}}>
                    See more <ArrowIcon />
                  </div>
                  </Link>
              </div>
        <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
          
          {similarMovie.map((movie) => {
            return (
              <Link href={`/movie/${movie.id}`}>
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
                    <StarWhite />
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
