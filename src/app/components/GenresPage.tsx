"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { GenreIcon } from "../assets/GenreIcon";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { GenreBlackIcon } from "../assets/GenreBlackIcon";

type Genre = {
  id: number;
  name: string;
};

type GenresPageProps = {
  genres: Genre[];
  selectedGenre: string | null;
  loading: boolean;
};

export const GenresPage = ({
  genres,
  selectedGenre,
  loading,
}: GenresPageProps) => {
  return (
    <div className="flex flex-wrap gap-4 lg:w-[387px] w-[308px]">
      {genres.length === 0 && loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[32px] w-[100px] rounded-full"
              style={{ backgroundColor: "#F4F4F5" }}
            />
          ))
        : genres.map(({ id, name }) => (
            <Link key={id} href={`/search?genre=${id}`}>
              <Badge
                variant={
                  selectedGenre === id.toString() ? "default" : "outline"
                }
                className={`cursor-pointer transition-colors
      ${
        selectedGenre === id.toString()
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-white text-black dark:bg-[#171717] dark:text-white border-gray-200 dark:border-[#262626] hover:bg-gray-200 dark:hover:bg-[#262626]"
      }`}
              >
                {name}
                <span className="block dark:hidden w-4 h-4">
                  <div className="w-full h-full">
                    <GenreIcon />
                  </div>
                </span>
                <span className="dark:block hidden w-4 h-4">
                  <div className="w-full h-full">
                    <GenreBlackIcon />
                  </div>
                </span>
              </Badge>
            </Link>
          ))}
    </div>
  );
};
