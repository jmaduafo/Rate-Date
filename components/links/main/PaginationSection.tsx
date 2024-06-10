'use client'
import React, { SetStateAction, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  totalItems?: number;
  itemsPerPage?: number;
  currentPage?: number;
  setCurrentPage?: React.Dispatch<SetStateAction<number>>
}

function PaginationSection({ totalItems, itemsPerPage, currentPage, setCurrentPage }: PaginationProps) {

  let pages = []

  if (totalItems && itemsPerPage) {
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i)
    }
  }

  function handlePrevious() {
    if (currentPage && currentPage > 1) {
      setCurrentPage && setCurrentPage(prev => prev - 1)
    }
  }

  function handleNext() {
    if (currentPage && currentPage < pages.length) {
      setCurrentPage && setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <Pagination className="text-darkText justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={`${currentPage === 1 && 'cursor-not-allowed opacity-50'}`} onClick={handlePrevious}/>
        </PaginationItem>
        {/* <PaginationItem>
          1
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext onClick={handleNext} className={`${currentPage === pages.length && 'cursor-not-allowed opacity-50'}`}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationSection;
