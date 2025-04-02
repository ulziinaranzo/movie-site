// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { StarWhite } from "../assets/StarWhite"; 
// import { Badge } from "@/components/ui/badge"; 
// import { useParams } from "next/navigation"
// import { headers } from "next/headers";

// type Params = { id: string}
// type MovieDetails = {
//   adult: boolean;
//   title: string;
//   id: number;
//   overview: string;
//   poster_path: string;
//   backdrop_path: string;
//   release_date: string;
//   runtime: string;
//   vote_average: string;
//   genres: string;
//   director: string;
//   writers: string;
//   cast: string;

// }

// const Access_Token =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

// const MoviePage = () => {

//   const { id } = useParams<Params>()
//   const [movie, setMovie] = useState<MovieDetails | null>(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const { data } = await axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, 
//           {
//             headers: {
//               Authorization: `Bearer ${Access_Token}`,
//             },
//           }
//         );
//         setMovie(data);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       } 
//     };

//     fetchMovie();
//   }, [id]);



//   if (!movie) {
//     return <div>Movie not found</div>;
//   }

//   return (
//     <div className="w-[1440px] h-fit m-auto">
//       <div className="flex flex-col dark:bg-black bg-white lg:pl-[180px] lg:pr-[180px] lg:pt-[52px] lg:pb-[113px]">
//         <div className="flex justify-between gap-[4px] mb-[24px]">
//           <div className="flex flex-col">
//             <div className="font-[700px] text-[36px] text-white">{movie.title}</div>
//             <div className="font-[400px] text-[18px] text-white">
//               {movie.release_date} · {movie.runtime} · {movie.vote_average}/10
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <div className="text-[12px] text-white font-[500]">Rating</div>
//             <div className="flex gap-[2px]">
//               <div className="h-[48px] w-[28px]">
//                 <StarWhite />
//               </div>
//               <div className="flex flex-col">
//                 <div className="flex">
//                   <div className="font-[400] text-[16px] text-white">{movie.vote_average}</div>
//                   <div className="font-[300] text-[14px] text-[#A1A1AA] mt-[2px]">
//                     /10
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-[32px] mb-[32px]">
//           <img
//             className="w-[290px] h-[428px]"
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//           />
//           <img
//             className="w-[760px] h-[428px]"
//             src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//             alt={movie.title}
//           />
//         </div>
//         <div className="flex flex-col gap-[20px]">
//           <div className="flex gap-[12px]">
//             {movie.genres.map((item: { name: string }, index: number) => {
//               return (
//                 <Badge key={index} variant="outline" className="text-white">
//                   {item.name}
//                 </Badge>
//               );
//             })}
//           </div>
//           <div className="font-normal w-[1080px] h-[48px] text-white">
//             {movie.overview}
//           </div>
//           <div className="flex gap-[53px]">
//             <div className="flex flex-col">
//               <div className="font-bold text-[16px] text-[white]">Director</div>
//               <div className="text-[16px] font-[400] text-white">
//                 {movie.director || "N/A"}
//               </div>
//               <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
//               <div className="font-bold text-[16px] text-[white]">Writers</div>
//               <div className="text-[16px] font-[400] text-white">
//                 {movie.writers || "N/A"}
//               </div>
//               <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
//               <div className="font-bold text-[16px] text-[white]">Stars</div>
//               <div className="text-[16px] font-[400] text-white">
//                 {movie.cast || "N/A"}
//               </div>
//               <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { Badge } from "@/components/ui/badge"; 
// import { useParams } from "next/navigation"
// import { StarWhite } from "@/app/assets/StarWhite";

// type Params = { id: string }
// type MovieDetails = {
//   adult: boolean;
//   title: string;
//   id: number;
//   overview: string;
//   poster_path: string;
//   backdrop_path: string;
//   release_date: string;
//   runtime: string;
//   vote_average: string;
//   genres: { name: string }[];  
//   director: string | null;
//   writers: string | null;
//   cast: string | null;
// }

// const Access_Token =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

// const MoviePage = () => {
//   const { id } = useParams<Params>();  
//   const [movie, setMovie] = useState<MovieDetails | null>(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const { data } = await axios.get(
//           `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
//           {
//             headers: {
//               Authorization: `Bearer ${Access_Token}`,
//             },
//           }
//         );
//         setMovie(data);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     if (id) {
//       fetchMovie();
//     }
//   }, [id]);

//   useEffect (() => {
//     const detailsMovie = async () => {
//       try {
//         const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, { headers: {
//           Authorization: `Bearer ${Access_Token}`
//         },})
//         setMovie(data)
//       } catch (error) {
//         console.log("Error")
//       }
//     }
//     if (id) {
//       detailsMovie()
//     }
//   })

//   if (!movie) {
//     return <div>Movie not found {id}</div>;
//   }

//   return (
//     <div className="w-[1440px] h-fit m-auto">
//       <div className="flex flex-col dark:bg-black bg-white lg:pl-[180px] lg:pr-[180px] lg:pt-[52px] lg:pb-[113px]">
//         <div className="flex justify-between gap-[4px] mb-[24px]">
//           <div className="flex flex-col">
//             <div className="font-[700px] text-[36px] text-white">{movie.title}</div>
//             <div className="font-[400px] text-[18px] text-white">
//               {movie.release_date} · {movie.runtime} · {movie.vote_average}/10
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <div className="text-[12px] text-white font-[500]">Rating</div>
//             <div className="flex gap-[2px]">
//               <div className="h-[48px] w-[28px]">
//                 <StarWhite />
//               </div>
//               <div className="flex flex-col">
//                 <div className="flex">
//                   <div className="font-[400] text-[16px] text-white">{movie.vote_average}</div>
//                   <div className="font-[300] text-[14px] text-[#A1A1AA] mt-[2px]">
//                     /10
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-[32px] mb-[32px]">
//           <img
//             className="w-[290px] h-[428px]"
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//           />
//           <img
//             className="w-[760px] h-[428px]"
//             src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//             alt={movie.title}
//           />
//         </div>
//         <div className="flex flex-col gap-[20px]">
//           <div className="flex gap-[12px]">
//             {movie.genres.map((item, index) => (
//               <Badge key={index} variant="outline" className="text-white">
//                 {item.name}
//               </Badge>
//             ))}
//           </div>
//           <div className="font-normal w-[1080px] h-[48px] text-white">
//             {movie.overview}
//           </div>
//           <div className="flex gap-[53px]">
//             <div className="flex flex-col">
//               <div className="font-bold text-[16px] text-[white]">Director</div>
//               <div className="text-[16px] font-[400] text-white">
//                 {movie.director || ""}
//               </div>
//               <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
//               <div className="font-bold text-[16px] text-[white]">Writers</div>
//               <div className="text-[16px] font-[400] text-white">
//                 {movie.writers || "N/A"}
//               </div>
//               <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
//               <div className="font-bold text-[16px] text-[white]">Stars</div>
//               <div className="text-[16px] font-[400] text-white">
//                 {movie.cast || ""}
//               </div>
//               <img src="/Images/Line.png" className="w-[1080px] h-[1px]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoviePage;


"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { StarWhite } from "@/app/assets/StarWhite";

type Params = { id: string };
type MovieDetails = {
  adult: boolean;
  title: string;
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: string;
  vote_average: string;
  genres: { name: string }[];
};

type Credits = {
  director: string | null;
  writers: string | null;
  cast: string | null;
};

const Access_Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg"

const MoviePage = () => {
  const { id } = useParams<Params>();  
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${Access_Token}`,
            },
          }
        );
        setCredits({
          director: data.crew?.find((person) => person.job === "Director")?.name || "N/A",
          writers: data.crew
            ?.filter((person) => person.job === "Writer")
            .map((person) => person.name)
            .join(", ") || "N/A",
          cast: data.cast?.slice(0, 5).map((person) => person.name).join(", ") || "N/A",
        });
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
      fetchMovieCredits();
    }
  }, [id]);

  if (!movieDetails || !credits) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="w-[1440px] h-fit m-auto">
      <div className="flex flex-col dark:bg-black bg-white lg:pl-[180px] lg:pr-[180px] lg:pt-[52px] lg:pb-[113px]">
        <div className="flex justify-between gap-[4px] mb-[24px]">
          <div className="flex flex-col">
            <div className="font-[700px] text-[36px] text-white">{movieDetails.title}</div>
            <div className="font-[400px] text-[18px] text-white">
              {movieDetails.release_date} · {movieDetails.runtime} · {movieDetails.vote_average}/10
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[12px] text-white font-[500]">Rating</div>
            <div className="flex gap-[2px]">
              <div className="h-[48px] w-[28px]">
                <StarWhite />
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div className="font-[400] text-[16px] text-white">{movieDetails.vote_average}</div>
                  <div className="font-[300] text-[14px] text-[#A1A1AA] mt-[2px]">
                    /10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[32px] mb-[32px]">
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
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[12px]">
            {movieDetails.genres.map((item, index) => (
              <Badge key={index} variant="outline" className="text-white">
                {item.name}
              </Badge>
            ))}
          </div>
          <div className="font-normal w-[1080px] h-[48px] text-white">
            {movieDetails.overview}
          </div>
          <div className="flex gap-[53px]">
            <div className="flex flex-col">
              <div className="flex">
              <div className="font-bold text-[16px] text-[white] w-64">Director</div>
              <div className="text-[16px] font-[400] text-white">{credits.director}</div>
              </div>
              <img src="/Images/Separator.png" className="w-[1080px] h-[6px]" />
              <div className="flex gap-[53px]"> <div className="font-bold text-[16px] text-[white] w-64">Writers</div>
              <div className="text-[16px] font-[400] text-white">{credits.writers}</div></div>
              <img src="/Images/Separator.png" className="w-[1080px] h-[6px]" />
              <div className="flex">
              <div className="font-bold text-[16px] text-[white] w-64">Stars</div>
              <div className="text-[16px] font-[400] text-white">{credits.cast}</div>
              </div>
              <img src="/Images/Separator.png" className="w-[1080px] h-[6px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
