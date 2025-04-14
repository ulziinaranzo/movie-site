import { PlayIconTrailer } from "@/app/assets/PlayIconTrailer";
import { MovieDetails } from "./Types";

interface MovieMediaProps {
  movieDetails: MovieDetails;
  trailerShow: boolean;
  setTrailerShow: (show: boolean) => void;
  trailer: string | null;
}

export default function MovieMedia({ movieDetails, trailerShow, setTrailerShow, trailer }: MovieMediaProps) {
  return (
    <div className="flex gap-[32px] mb-[32px] relative">
      {trailerShow && (
        <button
          onClick={() => setTrailerShow(false)}
          className="absolute top-[16px] right-[16px] text-white text-[24px] font-bold bg-black/60 rounded-full w-[32px] h-[32px] flex items-center justify-center hover:bg-black/80 z-10"
          aria-label="Close Trailer"
        >
          ✕
        </button>
      )}
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
      {!trailerShow && trailer && (
        <button
          className="flex items-center gap-[12px] absolute bottom-[10%] right-[45%] text-white text-[16px]"
          onClick={() => setTrailerShow(true)}
        >
          <PlayIconTrailer />
          Play Trailer
        </button>
      )}
    </div>
  );
}
