import Link from "next/link";
import { ArrowIcon } from "@/app/assets/ArrowIcon";
import { StarWhite } from "@/app/assets/StarWhite";
import { MovieDetails } from "./Types";
import { StarIcon } from "../assets/StarIcon";
import { WhiteArrowIcon } from "../assets/WhiteArrowIcon";

interface SimilarMoviesProps {
  similarMovie: MovieDetails[];
}

export default function SimilarMovies({ similarMovie }: SimilarMoviesProps) {
  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-4 sm:px-5 pb-12 sm:pb-[52px] dark:bg-black bg-white">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl sm:text-2xl font-semibold dark:text-white text-black mt-6 sm:mt-8 mb-4 sm:mb-9">
          More like this
        </h2>
        <Link href="/similar" legacyBehavior>
          <a className="flex items-center text-sm sm:text-[14px] font-medium gap-2 dark:text-white text-black">
            See more
            <span className="block dark:hidden">
              <WhiteArrowIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
            <span className="hidden dark:block">
              <ArrowIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-8 w-full">
        {similarMovie.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} legacyBehavior>
            <a className="group focus:outline-none h-full">
              <div className="flex flex-col items-center rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 w-full h-full">
                <div className="relative w-full aspect-[2/3] overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-movie.png";
                    }}
                  />
                </div>

                <div className="w-full p-2 sm:p-[8px] bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col group-hover:bg-[#E5E5E5] dark:group-hover:bg-[#3A3A3A] transition-colors duration-300">
                  <div className="flex items-center text-xs sm:text-sm text-black dark:text-white gap-1">
                    <span className="flex w-[16px] h-[16px] block dark:hidden">
                      <StarIcon />
                    </span>
                    <span className="flex hidden dark:block w-[px] h-[8px]">
                      <StarWhite className="w-full h-full" />
                    </span>
                    <div className="flex items-baseline">
                      <span className="font-semibold lg:text-[14px] text-[12px] mr-0.5">
                        {Number(movie.vote_average).toFixed(1)}
                      </span>
                      <span className="text-[10px] sm:text-xs text-[#71717A]">
                        /10
                      </span>
                    </div>
                  </div>
                  <h3 className="lg:text-[18px] text-[14px] line-clamp-1 text-black dark:text-white mt-0.5">
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