import { PlayIconTrailer } from "@/app/assets/PlayIconTrailer";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieDetails } from "./Types";

interface MovieMediaProps {
  movieDetails: MovieDetails;
  trailerShow: boolean;
  setTrailerShow: (show: boolean) => void;
  trailer: { key: string; time: number } | null;
  formatTrailerDuration: (duration: number) => string;
}

export default function MovieMedia({
  movieDetails,
  trailerShow,
  setTrailerShow,
  trailer,
  formatTrailerDuration,
}: MovieMediaProps) {
  const trailerDuration = trailer ? formatTrailerDuration(trailer.time) : null;

  const isLoading =
    !movieDetails.poster_path || !movieDetails.backdrop_path;

  return (
    <div className="flex gap-[32px] mb-[32px] relative">
      {isLoading ? (
        <Skeleton className="animate-pulse absolute left-[20px] top-[240px] w-[100px] h-[148px] lg:static lg:w-[290px] lg:h-[428px] rounded-lg bg-[#F4F4F5] dark:bg-[#27272A]" />
      ) : (
        <img
          className="absolute left-[20px] top-[240px] w-[100px] h-[148px] lg:static lg:w-[290px] lg:h-[428px]"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
      )}

      {isLoading ? (
        <Skeleton className="animate-pulse w-[375px] h-[211px] lg:w-[760px] lg:h-[428px] bg-[#F4F4F5] dark:bg-[#27272A]" />
      ) : (
        <img
          className="w-[375px] h-[211px] lg:w-[760px] lg:h-[428px]"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
        />
      )}

      {!trailerShow && trailer && !isLoading && (
        <button
          className="flex justify-center items-center gap-[12px] absolute bottom-[6%] left-[10px] lg:left-[350px] text-white text-[16px]"
          onClick={() => setTrailerShow(true)}
        >
          <PlayIconTrailer />
          Play Trailer {trailerDuration}
        </button>
      )}
    </div>
  );
}
