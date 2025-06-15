import Link from "next/link";
import { ArrowIcon } from "@/app/assets/ArrowIcon";
import { StarWhite } from "@/app/assets/StarWhite";
import { MovieDetails } from "./Types";
import { StarIcon } from "../assets/StarIcon";
import { WhiteArrowIcon } from "../assets/WhiteArrowIcon";
import { Skeleton } from "@/components/ui/skeleton"; // Tailwind Skeleton component

interface SimilarMoviesProps {
  similarMovie: MovieDetails[];
  isLoading: boolean;
  movieId: string;
}

export default function SimilarMovies({
  similarMovie,
  isLoading,
  movieId,
}: SimilarMoviesProps) {
  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-4 sm:px-5 pb-12 sm:pb-[52px] dark:bg-black bg-white">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl sm:text-2xl font-semibold dark:text-white text-black mt-6 sm:mt-8 mb-4 sm:mb-9">
          More like this
        </h2>
        <Link href={`/similar/${movieId}`} legacyBehavior>
          <a className="flex items-center text-sm sm:text-[14px] font-medium gap-2 dark:text-white text-black">
            See more
            <span className="block dark:hidden">
              <div className="w-3 h-3 sm:w-4 sm:h-4">
                <WhiteArrowIcon />
              </div>
            </span>
            <span className="hidden dark:block">
              <div className="w-3 h-3 sm:w-4 sm:h-4">
                <ArrowIcon />
              </div>
            </span>
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[20px] lg:gap-[32px] lg:w-full w-[375px]">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg overflow-hidden w-[157.5px] sm:w-full mx-auto"
              >
                <Skeleton className="w-full h-[233.1px] sm:aspect-[2/3] rounded-md" />
                <div className="w-full p-1 sm:p-2 bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col gap-2 mt-2">
                  <Skeleton className="h-4 w-[60px] rounded" />
                  <Skeleton className="h-5 w-full rounded" />
                </div>
              </div>
            ))
          : similarMovie.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id} legacyBehavior>
                <a className="group focus:outline-none h-full w-[157.5px] sm:w-full mx-auto">
                  <div className="flex flex-col items-center rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 w-full h-full">
                    <div className="relative w-full h-[233.1px] sm:aspect-[2/3] overflow-hidden">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-movie.png";
                        }}
                      />
                    </div>

                    <div className="w-full p-1 sm:p-2 bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col group-hover:bg-[#E5E5E5] dark:group-hover:bg-[#3A3A3A] transition-colors duration-300">
                      <div className="flex items-center text-[11px] sm:text-sm text-black dark:text-white gap-1">
                        <span className="flex w-4 h-4 block dark:hidden">
                          <StarIcon />
                        </span>
                        <span className="hidden dark:flex w-4 h-4">
                          <StarWhite className="w-full h-full" />
                        </span>
                        <div className="flex items-baseline">
                          <span className="font-semibold text-[12px] mr-0.5">
                            {Number(movie.vote_average).toFixed(1)}
                          </span>
                          <span className="text-[10px] sm:text-xs text-[#71717A]">
                            /10
                          </span>
                        </div>
                      </div>
                      <h3 className="text-[13px] sm:text-[14px] lg:text-[18px] line-clamp-1 text-black dark:text-white mt-0.5">
                        {movie.title}
                      </h3>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
      </div>
    </div>
  );
}
