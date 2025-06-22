"use client";
import React from "react";

interface MovieIdTrailerProps {
  trailerShow: boolean;
  setTrailerShow: (show: boolean) => void;
  trailer: string | null;
}

export const MovieIdTrailer: React.FC<MovieIdTrailerProps> = ({
  trailerShow,
  setTrailerShow,
  trailer,
}) => {
  if (!trailerShow || !trailer) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 px-4">
      <div className="relative w-full max-w-[997px]">
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold rounded-full bg-black bg-opacity-60 w-8 h-8 flex items-center justify-center"
          onClick={() => setTrailerShow(false)}
        >
          ✕
        </button>
        <div className="w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Movie Trailer"
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
