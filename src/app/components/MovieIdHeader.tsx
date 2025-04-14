import { MovieDetails } from "./Types";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieHeaderProps {
  movieDetails: MovieDetails;
  movieCertification: string | null;
  formatRunTime: (runtime: string) => string;
}

const formatVoteCount = (count: number): string => {
  return count >= 1000 ? `${Math.floor(count / 1000)}` : count.toString();
};

export default function MovieHeader({
  movieDetails,
  movieCertification,
  formatRunTime,
}: MovieHeaderProps) {
  const isLoading = !movieDetails.title;

  return (
    <div className="flex sm:flex-row justify-between gap-3 mb-6 w-full max-w-[375px] lg:max-w-full">
      <div className="flex flex-col">
        {isLoading ? (
          <Skeleton className="h-[36px] w-[200px] mb-2" />
        ) : (
          <div className="pl-[20px] font-semibold lg:font-bold text-[24px] lg:text-[36px] text-black dark:text-white lg:pl-[0px]">
            {movieDetails.title}
          </div>
        )}

        {isLoading ? (
          <Skeleton className="h-[18px] w-[180px]" />
        ) : (
          <div className="lg:pl-[px] pl-[20px] font-normal text-[14px] lg:text-[18px] text-black dark:text-white">
            {movieDetails.release_date} · {movieCertification} ·{" "}
            {formatRunTime(movieDetails.runtime)}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:items-start items-end">
        <div className="text-[12px] dark:text-white text-black font-medium">
          <b>Rating</b>
        </div>
        {isLoading ? (
          <div className="flex gap-[6px] items-start mt-2">
            <Skeleton className="w-[28px] h-[28px] rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[16px] w-[60px]" />
              <Skeleton className="h-[12px] w-[40px]" />
            </div>
          </div>
        ) : (
          <div className="flex gap-[6px] items-start mt-2">
            <img
              className="h-[28px] w-[28px]"
              src="/Images/star.png"
              alt="star"
            />
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <div className="font-normal text-[16px] text-black dark:text-white">
                  <b>{Number(movieDetails.vote_average).toFixed(1)}</b>
                </div>
                <div className="font-light text-[14px] text-[#A1A1AA]">
                  /10
                </div>
              </div>
              <div className="font-normal text-[12px] text-[#71717A]">
                {formatVoteCount(movieDetails.vote_count)}k
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
