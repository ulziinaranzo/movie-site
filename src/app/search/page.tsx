"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { GenreIcon } from "../assets/GenreIcon";
import { useGenres } from "../_components/GenreProvider";
import { Badge } from "@/components/ui/badge";
import { StarWhite } from "../assets/StarWhite";
import { LongLineIcon } from "../assets/LongLineIcon";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { StarIcon } from "../assets/StarIcon";
import { Access_Token } from "../components/Types";


  export type Movie = {
    vote_average: number;
    id: number;
    genre_ids: number[];
    backdrop_path: "string";
    poster_path: "string";
    title: "string";
    overview: "string";
  };

type Response = {
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const SearchPage = () => {
    const SearchParams = useSearchParams();
    const genre = SearchParams.get("genre");

    const { genres } = useGenres(); 

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    const handlePrev = () => {
      if (page > 1) {
        setPage((prev) => prev - 1);
      }
    };
  
    const handleNext = () => {
      if (page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };
  
    const handlePage = (page: number) => {
      setPage(page);
    };

    useEffect(() => {
        const getMovies = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get<Response>(
                    `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genre}&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${Access_Token}`,
                        },
                    }
                );

                setMovies(data.results);
                setTotalPages(data.total_pages)
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        getMovies();
    }, [genre]);

    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, page + 1)

    return (
        <div className="flex w-max-1440 h-fit flex-col">
          <div className="flex dark:text-white text-black text-[30px] font-[600] lg:mb-[32px]">Search Results</div>
          <div className="flex gap-[44px]">
          <div className="flex flex-col lg:w-fit gap-[32px]">
            <div className="dark:text-white text-black font-[600] text-[20px]">{`${movies.length} results for "Wicked"`}</div>

<div className="grid grid-cols-2 gap-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-[32px]">
  
  {movies.map((movie) => {
    return (
      <Link href={`/movie/${movie.id}`} key={movie.id}>
      <div
        
        className="flex flex-col items-center rounded-lg overflow-hidden"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="object-cover w-[158px] h-[233px] lg:w-full lg:h-[340px]"
        />
        <div className="bg-[#F4F4F5] w-[165px] h-[76px] lg:w-full lg:h-[99px] p-[8px] flex flex-col">
          <div className="flex items-center text-sm lg:text-[16px] text-black gap-[5px]">
            <StarIcon />
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
   <div className="flex justify-end">
    <div className="w-fit">
    <Pagination aria-label="Movie Pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrev} disabled={page === 1} />
            </PaginationItem>

            {startPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(1)}>1</PaginationLink>
              </PaginationItem>
            )}

            {startPage > 2 && <PaginationEllipsis />}

            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === startPage + index}
                  onClick={() => handlePage(startPage + index)}
                >
                  {startPage + index}
                </PaginationLink>
              </PaginationItem>
            ))}

            {endPage < totalPages - 1 && <PaginationEllipsis />}

            {endPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext onClick={handleNext} disabled={page === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    </div>
        
      </div>
</div>
          </div>
          <div className="h-[826px]">
          <LongLineIcon/>
          </div>
          
          <div className="flex flex-col">
          <div className="dark:text-white text-[24px] font-[600] mb-[4px]">Search by genre</div>
          <div className="text-[16px] font-[400] mb-[20px]">See lists of movies by genre</div>
        <div className="flex flex-wrap gap-4 w-[387px]">
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
          </div>
          </div>
        </div>
        
    );
};

export default SearchPage;
