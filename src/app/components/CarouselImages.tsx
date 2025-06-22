"use client";
import { MovieDetails } from "./Types";

type Props = {
  movies: MovieDetails[];
  index: number;
  goToSlide: (slideIndex: number) => void;
};

export const CaroulImages = ({ movies, index, goToSlide }: Props) => {
  if (movies.length === 0) return null;

  return (
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
              i === index % 3 ? "bg-white opacity-100" : "bg-white opacity-30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
