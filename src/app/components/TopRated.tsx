"use client";

import { useState, useEffect } from "react";
import { ArrowIcon } from "../assets/ArrowIcon";
import { StarIcon } from "../assets/StarIcon";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

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
type Response = {
  results: Movie[];
};
export const TopRated = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

  useEffect(() => {
    const getMoviesByAxios = async () => {
      try {
        const { data } = await axios.get<Response>(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMoviesByAxios();

    return () => {};
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-[20px] lg:px-[80px] pb-[52px] gap-[32px] dark:text-white text-black dark:bg-black bg-white">
      <div className="flex justify-between text-center items-center">
        <div className="flex text-[24px] font-[600] text-black darl:text-white mb-[4px]">
          Top Rated
        </div>
        <Link href={"/topRated"}>
          <div className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer dark:text-white text-black" onClick={() => {router.push("/topRated")}}>
            See more <ArrowIcon />
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-[158px] h-[233px] lg:w-full lg:h-[340px]"
            />
            <div className="bg-[#F4F4F5] w-[157px] h-[76px] lg:w-full lg:h-[99px] p-[8px] flex flex-col">
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
        ))}
      </div>
    </div>
  );
};

// "use client";
// import { useState, useEffect } from "react";
// import { ArrowIcon } from "../assets/ArrowIcon";
// import { StarIcon } from "../assets/StarIcon";
// import Link from "next/link";

// const items = [
//   { img: "Images/toprated-1.png", rating: "6.9", name: "Pulp Fiction" },
//   {
//     img: "Images/toprated-2.png",
//     rating: "6.9",
//     name: "The Lord of the Rings: Fellowship of the Kings",
//   },
//   {
//     img: "Images/toprated-3.png",
//     rating: "6.9",
//     name: "The Good, the Bad and the Ugly",
//   },
//   { img: "Images/toprated-4.png", rating: "6.9", name: "Forrest Gump" },
//   { img: "Images/toprated-5.png", rating: "6.9", name: "Fight Club" },
//   { img: "Images/toprated-6.png", rating: "6.9", name: "Saving Private Ryan" },
//   { img: "Images/toprated-7.png", rating: "6.9", name: "City of God" },
//   {
//     img: "Images/toprated-8.png",
//     rating: "6.9",
//     name: "The Green Mile",
//   },
//   { img: "Images/toprated-9.png", rating: "6.9", name: "Life is Beautiful" },
//   {
//     img: "Images/toprated-10.png",
//     rating: "6.9",
//     name: "Terminator 2: Judgement Day",
//   },
// ];

// export const TopRated = () => {
//   return (
//     <div className="flex flex-col w-full max-w-[1440px] mx-auto h-fit px-[20px] lg:px-[80px] pb-[52px] gap-[32px]">
//       <div className="flex justify-between text-center items-center">
//         <div className="flex text-[24px] font-[600] text-[white] mb-[4px]">
//           Top Rated
//         </div>
//         <Link href={"/topRated"}>
//           <div className="flex items-center text-[14px] font-[500] gap-[8px] cursor-pointer text-white">
//             See more <ArrowIcon />
//           </div>
//         </Link>
//       </div>
//       <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-[32px]">
//         {items.map(({ img, rating, name }, index) => {
//           return (
//             <div
//               key={index}
//               className="flex flex-col items-center rounded-lg overflow-hidden"
//             >
//               <img
//                 src={img}
//                 className="object-cover w-[158px] h-[233px] lg:w-full lg:h-[340px]"
//               />
//               <div className="bg-[#F4F4F5] w-[157px] h-[76px] lg:w-full lg:h-[99px] p-[8px] flex flex-col">
//                 <div className="flex items-center text-sm lg:text-[16px] text-black gap-[5px]">
//                   <StarIcon />
//                   <b>{rating}</b>
//                   <span className="text-[12px] text-[#71717A] font-[500]">
//                     /10
//                   </span>
//                 </div>
//                 <div className="text-sm lg:text-[18px] text-black">{name}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
