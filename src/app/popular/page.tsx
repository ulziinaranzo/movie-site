import { MovieListSection } from "@/app/components/MovieListSection";

export default function PopularPage() {
  return (
    <MovieListSection
      title="Popular Movies"
      apiUrl="https://api.themoviedb.org/3/movie/popular?language=en-US"
    />
  );
}
