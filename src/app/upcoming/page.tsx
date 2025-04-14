import { MovieListSection } from "@/app/components/MovieListSection"

export default function UpcomingPage() {
  return (
    <MovieListSection
      title="Upcoming Movies"
      apiUrl="https://api.themoviedb.org/3/movie/upcoming?language=en-US"
    />
  );
}
