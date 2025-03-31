"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LineIcon } from "../assets/LineIcon";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { GenreIcon } from "../assets/GenreIcon";

import { Label } from "@radix-ui/react-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { StarWhite } from "../assets/StarWhite";
import { ArrowIcon } from "../assets/ArrowIcon";
import { CommandDialog } from "cmdk";
import Link from "next/link";

const type = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Flim-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

interface HeaderProps {
  toggleDarkMode: () => void;
}

export const Header = ({toggleDarkMode }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between m-0 h-fit bg-[black] py-[11.5px] px-5 lg:px-20 ">
      <Link href={"/"}>
        <img className="w-[92px] h-[20px] mt-[10px]" src="/Images/Logo.png" />
      </Link>

      <div className="flex justify-center items-center gap-[12px] text-[14px] font-medium">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Genres</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[577px]  flex flex-col p-[20px]">
            <div className="text-[24px] font-[600] text-[#09090B]">Genres</div>
            <div className="text-[16px] text-[#09090B] font-[400]">
              See lists of movies by genre
            </div>
            <div className="mt-[16px] mb-[16px]">
              <LineIcon />
            </div>
            <div className="flex flex-wrap w-[537px] gap-[16px]">
              {type.map((item, index) => {
                return (
                  <Badge
                    variant="outline"
                    key={index}
                    className="cursor-pointer"
                  >
                    {item}
                    <GenreIcon />
                  </Badge>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        <div className="hidden lg:flex ">
          <img
            src="/Images/_magnifying-glass.png"
            className="hidden lg:flex absolute left-[857px] top-[22px] w-[16px] h-[16px] "
          />
          <Input
            type="text"
            placeholder="Search"
            className="text-white pl-[30px] w-[379px]"
          />
          {/* <input
            type="text"
            placeholder="Search"
            className="divide-none outline-none text-[20px] pl-[16px] bg-transparent"
          /> */}
        </div>
      </div>

      <div className="flex gap-[12px]">
        <img
          className=" lg:hidden w-[36px] h-[36px] rounded-xl"
          src="/Images/Search.png"
        />
        <img className="w-[36px] h-[36px] rounded-xl " src="/Images/Moon.png" />
      </div>
    </div>
  );
};














// "use client";
// import { Input } from "@/components/ui/input";
// import { useState, useEffect } from "react";
// import { LineIcon } from "../assets/LineIcon";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { ArrowIcon } from "../assets/ArrowIcon";
// import { GenreIcon } from "../assets/GenreIcon";
// import Link from "next/link";

// const type = [
//   "Action",
//   "Adventure",
//   "Animation",
//   "Biography",
//   "Comedy",
//   "Crime",
//   "Documentary",
//   "Drama",
//   "Family",
//   "Fantasy",
//   "Flim-Noir",
//   "Game-Show",
//   "History",
//   "Horror",
//   "Music",
//   "Musical",
//   "Mystery",
//   "News",
//   "Reality-TV",
//   "Romance",
//   "Sci-Fi",
//   "Short",
//   "Sport",
//   "Talk-Show",
//   "Thriller",
//   "War",
//   "Western",
// ];

// const API_KEY = "4ab655174f58d5c4383d2b343e357314";
// const BASE_URL = "https://api.themoviedb.org/3";

// export const Header = () => {
//   const [query, setQuery] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [movies, setMovies] = useState([]);

//   // Function to fetch movies by name
//   const fetchMoviesByName = async (query: string) => {
//     if (!query) return;
//     const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
//     const data = await response.json();
//     setMovies(data.results);
//   };

//   // Function to fetch movies by genre
//   const fetchMoviesByGenre = async (genreId: number) => {
//     const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
//     const data = await response.json();
//     setMovies(data.results);
//   };

//   // Handle search
//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(event.target.value);
//     fetchMoviesByName(event.target.value);
//   };

//   // Handle genre selection
//   const handleGenreSelect = (genre: string) => {
//     setSelectedGenre(genre);
//     const genreId = getGenreId(genre);
//     fetchMoviesByGenre(genreId);
//   };

//   // Get genre ID from genre name
//   const getGenreId = (genreName: string) => {
//     const genreMap: { [key: string]: number } = {
//       Action: 28,
//       Adventure: 12,
//       Animation: 16,
//       Biography: 99,
//       Comedy: 35,
//       Crime: 80,
//       Documentary: 99,
//       Drama: 18,
//       Family: 10751,
//       Fantasy: 14,
//       "Flim-Noir": 10769,
//       "Game-Show": 10770,
//       History: 36,
//       Horror: 27,
//       Music: 10402,
//       Musical: 10402,
//       Mystery: 9648,
//       News: 10767,
//       "Reality-TV": 10764,
//       Romance: 10749,
//       "Sci-Fi": 878,
//       Short: 10770,
//       Sport: 21,
//       "Talk-Show": 10767,
//       Thriller: 53,
//       War: 10752,
//       Western: 37,
//     };
//     return genreMap[genreName] || 0;
//   };

//   return (
//     <div className="flex w-full justify-between m-0 h-fit bg-[black] py-[11.5px] px-5 lg:px-20 ">
//       <Link href={"/"}>
//         <img className="w-[92px] h-[20px] mt-[10px]" src="/Images/Logo.png" />
//       </Link>

//       <div className="flex justify-center items-center gap-[12px] text-[14px] font-medium">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline">Genres</Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-[577px]  flex flex-col p-[20px]">
//             <div className="text-[24px] font-[600] text-[#09090B]">Genres</div>
//             <div className="text-[16px] text-[#09090B] font-[400]">
//               See lists of movies by genre
//             </div>
//             <div className="mt-[16px] mb-[16px]">
//               <LineIcon />
//             </div>
//             <div className="flex flex-wrap w-[537px] gap-[16px]">
//               {type.map((item, index) => {
//                 return (
//                   <Badge
//                     variant="outline"
//                     key={index}
//                     className="cursor-pointer"
//                     onClick={() => handleGenreSelect(item)}
//                   >
//                     {item}
//                     <GenreIcon />
//                   </Badge>
//                 );
//               })}
//             </div>
//           </PopoverContent>
//         </Popover>

//         <div className="hidden lg:flex ">
//           <Input
//             type="text"
//             placeholder="Search"
//             value={query}
//             onChange={handleSearch}
//             className="text-white pl-[30px] w-[379px]"
//           />
//         </div>
//       </div>

//       {/* Displaying search results */}
//       <div className="w-full mt-[20px]">
//         <div className="text-[24px] font-bold text-white">Movies</div>
//         <div className="flex flex-wrap gap-6 mt-4">
//           {movies.length > 0 ? (
//             movies.map((movie: any) => (
//               <div key={movie.id} className="w-[200px]">
//                 <Link href={`/movie/${movie.id}`}>
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                     alt={movie.title}
//                     className="rounded-lg"
//                   />
//                   <h3 className="text-white text-sm mt-2">{movie.title}</h3>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <div className="text-white">No movies found</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
