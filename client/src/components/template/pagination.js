import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];
  const paginationRange = 3; // Number of page numbers to display at a time

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  let startPage, endPage;

  if (totalPages <= paginationRange) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(paginationRange / 2)) {
      startPage = 1;
      endPage = paginationRange;
    } else if (currentPage + Math.floor(paginationRange / 2) >= totalPages) {
      startPage = totalPages - paginationRange + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(paginationRange / 2);
      endPage = currentPage + Math.ceil(paginationRange / 2) - 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto font-slussen">
      <div className="flex justify-center items-center py-5 gap-5">
        <div>
          <div
            className={`rounded-lg border border-theme p-2 sm:p-[11px] bg-theme ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } `}
            onClick={(e) => {
              if (currentPage !== 1) {
                previousPage(e);
              }
            }}
          >
            <ChevronLeft />
          </div>
        </div>
        <div className="flex justify-center items-center py-10 gap-2 sm:gap-5">
          {startPage > 1 && (
            <div
              className="hidden sm:block text-theme text-center cursor-pointer rounded-lg border border-theme px-3 py-1 sm:px-4 sm:py-2 w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] "
              onClick={() => paginate(1)}
            >
              1
            </div>
          )}
          {totalPages > 4 && startPage > 1 && currentPage > 3 && (
            <div className="hidden sm:block text-theme text-center rounded-lg border border-theme px-3 py-1 sm:px-4 sm:py-2 w-[34px] h-[34px] sm:w-[40px] sm:h-[40px]">
              ...
            </div>
          )}
          {pageNumbers.map((number) => (
            <div
              key={number}
              onClick={() => {
                if (number !== currentPage) {
                  paginate(number);
                }
              }}
              className={`${
                number === currentPage
                  ? "text-white bg-theme "
                  : "text-theme hover:text-white bg-white hover:bg-theme cursor-pointer "
              } transition duration-200 ease-in-out rounded-lg border border-theme text-base font-semibold px-3 py-1 sm:px-[14px] sm:py-[7px] w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] text-center `}
            >
              {number}
            </div>
          ))}
          {totalPages > 4 &&
            endPage < totalPages &&
            currentPage < totalPages - 2 && (
              <div className="hidden sm:block text-theme text-center rounded-lg border border-theme px-3 py-1 sm:px-4 sm:py-2 w-[34px] h-[34px] sm:w-[40px] sm:h-[40px]">
                ...
              </div>
            )}
          {endPage < totalPages && (
            <div
              className="hidden sm:block text-theme text-center cursor-pointer rounded-lg border border-theme px-3 py-1 sm:px-4 sm:py-2 w-[34px] h-[34px] sm:w-[40px] sm:h-[40px]"
              onClick={() => paginate(totalPages)} // Go to the last page
            >
              {totalPages}
            </div>
          )}
        </div>
        <div>
          <div
            className={`rounded-lg border border-theme p-2 sm:p-[11px] bg-theme ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } `}
            onClick={(e) => {
              if (currentPage !== totalPages) {
                nextPage(e);
              }
            }}
          >
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
