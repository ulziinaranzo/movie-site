import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Credits, MovieDetails } from "./Types";

export default function MovieInfo({
  movieDetails,
  credits,
}: {
  movieDetails: MovieDetails | null;
  credits: Credits | null;
}) {
  const isLoading = !movieDetails || !credits;

  return (
    <div className="flex flex-col lg:w-full w-[375px]">
      <div className="flex flex-col gap-[20px] lg:w-full lg:ml-0 w-[201px] ml-[154px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-wrap gap-[12px]">
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-[60px] h-[24px] rounded-full bg-[#F4F4F5] dark:bg-[#27272A]"
                  />
                ))
              : movieDetails.genres.map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="dark:text-white text-black text-[12px]"
                  >
                    {item.name}
                  </Badge>
                ))}
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-[64px] w-full mt-2 rounded bg-[#F4F4F5] dark:bg-[#27272A]" />
        ) : (
          <div className="font-normal w-full h-fit dark:text-white text-black font-[400] text-[16px] mt-2">
            {movieDetails.overview}
          </div>
        )}
      </div>

      <div className="flex flex-col w-full p-[20px] lg:p-0">
        {["Director", "Writers", "Stars"].map((label) => {
          const value =
            label === "Director"
              ? credits?.director
              : label === "Writers"
              ? credits?.writers
              : credits?.cast;

          return (
            <div key={label}>
              <div className="flex gap-x-4 items-start lg:mt-[20px]">
                <div className="font-bold text-base dark:text-white text-black w-24 sm:w-32 flex-shrink-0">
                  {label}
                </div>
                <div className="text-base font-normal dark:text-white text-black flex-1">
                  {isLoading ? (
                    <Skeleton className="h-[16px] w-[90%] rounded bg-[#F4F4F5] dark:bg-[#27272A]" />
                  ) : (
                    value
                  )}
                </div>
              </div>
              <div className="w-full h-px my-3 bg-gray-200 dark:bg-gray-600" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
