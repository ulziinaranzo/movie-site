import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { GenreIcon } from "../assets/GenreIcon";
import { useGenres } from "../_components/GenreProvider";
import { Badge } from "@/components/ui/badge";

const Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

  export type Movie = {
    vote_average: number;
    id: number;
    genre_ids: number[];
    backdrop_path: "string";
    poster_path: "string";
    title: "string";
    overview: "string";
  };

const SearchPage = () => {
    const SearchParams = useSearchParams();
    const genre = SearchParams.get("genre");

    const { genres } = useGenres(); 

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMovies = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genre}&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${Access_Token}`,
                        },
                    }
                );

                setMovies(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        getMovies();
    }, [genre]);

    return (
        <div className="flex w-max-1440 h-fit ">
<div className="flex flex-wrap gap-4">
            {genres.map(({ id, name }) => (
                <Link key={id} href={`/search?genre=${id}`}>
                    <Badge
                        variant={genre === id.toString() ? "default" : "outline"}
                        className="flex items-center gap-2"
                    >
                        {name} <GenreIcon />
                    </Badge>
                </Link>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
          
          {movies.map((movie) => {
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
        
    );
};

export default SearchPage;
