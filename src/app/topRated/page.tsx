import { MovieListSection } from "@/app/components/MovieListSection"

export default function TopRatedPage() {
  return (
    <MovieListSection
      title="Top Rated Movies"
      apiUrl="https://api.themoviedb.org/3/movie/top_rated?language=en-US"
    />
  );
}
