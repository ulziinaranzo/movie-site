"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { MovieDetails, Credits } from "@/app/components/Types";
import MovieHeader from "@/app/components/MovieIdHeader";
import MovieMedia from "@/app/components/MovieIdMedia";
import MovieInfo from "@/app/components/MovieIdInfo";
import SimilarMovies from "@/app/components/MovieIdSimilarMovies";
import { Access_Token } from "@/app/components/Types";
import { Loader2 } from "lucide-react";

const formatRunTime = (runtime: string) => {
  const runtimeNumber = parseInt(runtime, 10);
  if (!runtimeNumber) return "N/A";
  const hours = Math.floor(runtimeNumber / 60);
  const minutes = runtimeNumber % 60;
  return `${hours}h ${minutes}m`;
};

const formatTrailerDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [movieCertification, setMovieCertification] = useState<string | null>("N/A");
  const [trailer, setTrailer] = useState<{ key: string; time: number } | null>(null);
  const [trailerShow, setTrailerShow] = useState<boolean>(false);
  const [similarMovie, setSimilarMovie] = useState<MovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const [detailsRes, creditsRes, certifRes, trailerRes, similarRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: { Authorization: `Bearer ${Access_Token}` },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
            headers: { Authorization: `Bearer ${Access_Token}` },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates`, {
            headers: { Authorization: `Bearer ${Access_Token}` },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
            headers: { Authorization: `Bearer ${Access_Token}` },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, {
            headers: { Authorization: `Bearer ${Access_Token}` },
          }),
        ]);

        setMovieDetails(detailsRes.data);
        setCredits({
          director: creditsRes.data.crew?.find((person: any) => person.job === "Director")?.name || "N/A",
          writers: creditsRes.data.crew
            ?.filter((person: any) => person.job === "Writer")
            .map((person: any) => person.name)
            .join(", ") || "N/A",
          cast: creditsRes.data.cast?.slice(0, 5).map((person: any) => person.name).join(" · ") || "N/A",
        });

        const usRelease = certifRes.data.results.find((item: any) => item.iso_3166_1 === "US");
        setMovieCertification(usRelease?.release_dates[0]?.certification || "N/A");

        const trailerData = trailerRes.data.results.find((video: any) => video.type === "Trailer");
        setTrailer({
          key: trailerData?.key || "",
          time: trailerData?.duration || 0,
        });

        setSimilarMovie(similarRes.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    if (id) fetchData();
  }, [id]);

  if (!movieDetails || !credits) {
    return (
      <div className="flex flex-col gap-[10px] pt-[50px]">
        <div className="flex justify-center items-center flex-col text-bold text-[20px]">
          <Loader2 className="w-8 h-8 animate-spin"/>
          Loading movie details...
        </div>
      </div>
    );
  }

  return (
    <div className="w-[1440px] h-fit m-auto">
      <div className="flex flex-col dark:bg-black bg-white lg:pl-[180px] lg:pr-[180px] lg:pt-[52px] lg:pb-[113px] dark:bg-[black] bg-white text-black text-white">
        <MovieHeader
          movieDetails={movieDetails}
          movieCertification={movieCertification}
          formatRunTime={formatRunTime}
        />

        <MovieMedia
          movieDetails={movieDetails}
          trailerShow={trailerShow}
          setTrailerShow={setTrailerShow}
          trailer={trailer}
          formatTrailerDuration={formatTrailerDuration}
        />

        <MovieInfo movieDetails={movieDetails} credits={credits} />

        {trailerShow && trailer && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray bg-opacity-100 lg:bg-opacity-0 z-50">
            <div className="relative">
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold rounded-full bg-gray w-[10px] h-[10px]"
                onClick={() => setTrailerShow(false)}
              >
                X
              </button>
              <iframe
                width="997"
                height="561"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                className="rounded-lg"
              />
            </div>
          </div>
        )}

        <SimilarMovies similarMovie={similarMovie} isLoading={isLoading} /> 
      </div>
    </div>
  );
};

export default MoviePage;
