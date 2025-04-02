"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { StarWhite } from "../assets/StarWhite"; 
import { Badge } from "@/components/ui/badge"; 
import { StarIcon } from "../assets/StarIcon"; 

const Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

export default function MovieDetails() {
  const { query } = useRouter(); 
  const { id } = query; 
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, 
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="w-[1440px] h-fit m-auto">
      <div className="flex flex-col dark:bg-black bg-white lg:pl-[180px] lg:pr-[180px] lg:pt-[52px] lg:pb-[113px]">
        <div className="flex justify-between gap-[4px] mb-[24px]">
          <div className="flex flex-col">
            <div className="font-[700px] text-[36px] text-white">{movie.title}</div>
            <div className="font-[400px] text-[18px] text-white">
              {movie.release_date} · {movie.runtime} · {movie.vote_average}/10
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
                  <div className="font-[400] text-[16px] text-white">{movie.vote_average}</div>
                  <div className="font-[300] text-[14px] text-[#A1A1AA] mt-[2px]">
                    /10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[32px] mb-[32px]">
          <img
            className="w-[290px] h-[428px]"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <img
            className="w-[760px] h-[428px]"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[12px]">
            {movie.genres.map((item: { name: string }, index: number) => {
              return (
                <Badge key={index} variant="outline" className="text-white">
                  {item.name}
                </Badge>
              );
            })}
          </div>
          <div className="font-normal w-[1080px] h-[48px] text-white">
            {movie.overview}
          </div>
          <div className="flex gap-[53px]">
            <div className="flex flex-col">
              <div className="font-bold text-[16px] text-[white]">Director</div>
              <div className="text-[16px] font-[400] text-white">
                {movie.director || "N/A"}
              </div>
              <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
              <div className="font-bold text-[16px] text-[white]">Writers</div>
              <div className="text-[16px] font-[400] text-white">
                {movie.writers || "N/A"}
              </div>
              <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
              <div className="font-bold text-[16px] text-[white]">Stars</div>
              <div className="text-[16px] font-[400] text-white">
                {movie.cast || "N/A"}
              </div>
              <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
