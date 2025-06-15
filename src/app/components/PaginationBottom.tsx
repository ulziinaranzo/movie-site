"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationBottomProps = {
  page: number;
  startPage: number;
  endPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  handlePage: (page: number) => void;
};

export const PaginationBottom = ({
  page,
  startPage,
  endPage,
  totalPages,
  handlePrev,
  handleNext,
  handlePage,
}: PaginationBottomProps) => {
  return (
    <div className="w-full flex justify-end mt-6 pb-[32px]">
      <div className="ml-auto">
        <Pagination aria-label="Movie Pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={page === 1 ? undefined : handlePrev}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {startPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(1)}>1</PaginationLink>
              </PaginationItem>
            )}

            {startPage > 2 && <PaginationEllipsis />}

            {[...Array(endPage - startPage + 1)].map((_, index) => {
              const pageNum = startPage + index;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={page === pageNum}
                    onClick={() => handlePage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {endPage < totalPages - 1 && <PaginationEllipsis />}

            {endPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={page === totalPages ? undefined : handleNext}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
