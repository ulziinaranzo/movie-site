export type MovieDetails = {
  adult: boolean;
  title: string;
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: string;
  vote_average: number;
  genres: { name: string }[];
  vote_count: number;
};

export type Credits = {
  director: string | null;
  writers: string | null;
  cast: string | null;
};

export type Movie = {
  vote_average: number;
  id: number;
  genre_ids: number[];
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
};

export type Response = {
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  showResults: boolean;
  loading: boolean;
  movies: any[];
  setShowResults: (value: boolean) => void;
  setSearchButton: (value: boolean) => void;
  searchButton: boolean;
}
export const Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";
