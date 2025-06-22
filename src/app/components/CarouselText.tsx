"use client ";

import { PlayIcon } from "../assets/PlayIcon";
import { WhitePlayIcon } from "../assets/WhitePlayIcon";
import { MovieDetails } from "./Types";
type Props = {
  movies: MovieDetails[];
  index: number;
  trailerShow: boolean;
  setTrailerShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CarouselText = ({
  movies,
  index,
  trailerShow,
  setTrailerShow,
}: Props) => {
  return (
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
          <span className="flex items-center text-[14px] lg:text-[16px] font-regular text-gray-300 ml-[1px] mt-[2px] lg:mt-[18px]">
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
  );
};
