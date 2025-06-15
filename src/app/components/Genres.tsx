import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGenres } from "../_components/GenreProvider";
import { GenreIcon } from "../assets/GenreIcon";
import { useRouter } from "next/navigation";
import { GenreBlackIcon } from "../assets/GenreBlackIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export const Genres = () => {
  const router = useRouter();
  const { genres } = useGenres() || { genres: [] };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (genres.length > 0) {
      setLoading(false);
    }
  }, [genres]);

  const handleGenreClick = (genreId: number) => {
    router.push(`/search?genre=${genreId}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="hidden lg:flex dark:text-white text-black dark:bg-[#09090B] bg-white hover:bg-gray-100 dark:hover:bg-[#171717]"
        >
          Genres
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[335px] lg:w-[577px] flex flex-col p-5 dark:bg-[#09090B] bg-white">
        <div className="text-xl font-semibold text-black dark:text-white">
          Genres
        </div>
        <p className="text-sm text-[#71717A] dark:text-[#A3A3A3] mt-1">
          See lists of movies by genre
        </p>

        <Separator className="my-4 bg-gray-200 dark:bg-[#262626]" />

        <div className="flex flex-wrap gap-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Badge
                key={i}
                variant="outline"
                className="cursor-pointer bg-white dark:bg-[#171717] border-gray-200 dark:border-[#262626]"
              >
                <Skeleton className="w-[60px] h-[20px]" />
              </Badge>
            ))
          ) : genres.length > 0 ? (
            genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="outline"
                className="cursor-pointer bg-white dark:bg-[#171717] border-gray-200 dark:border-[#262626]
                              hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors flex items-center gap-1"
                onClick={() => handleGenreClick(genre.id)}
              >
                <span>{genre.name}</span>
                <span className="ml-1 dark:hidden block">
                  <GenreIcon />
                </span>
                <span className="ml-1 dark:block hidden">
                  <GenreBlackIcon />
                </span>
              </Badge>
            ))
          ) : (
            <p className="text-[#71717A] dark:text-[#A3A3A3]">
              No genres available
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
