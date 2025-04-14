import { MovieSection } from "./MovieSection";

export default function HomePage() {
  return (
    <>
      <MovieSection
        title="Upcoming"
        endpoint="upcoming"
        seeMoreLink="/upcoming"
      />
      <MovieSection
        title="Popular"
        endpoint="popular"
        seeMoreLink="/popular"
      />
      <MovieSection
        title="Top Rated"
        endpoint="top_rated"
        seeMoreLink="/topRated"
      />
    </>
  );
}
