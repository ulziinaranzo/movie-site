"use client"
import { MovieListSection } from "@/app/components/MovieListSection";
import { useParams } from "next/navigation";

export default function SimilarMoviesPage() {
  const { id } = useParams<{id: string}>()

  return (
    <MovieListSection
      title="Similar Movies"
      apiUrl={`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`}
    />
  );
}
