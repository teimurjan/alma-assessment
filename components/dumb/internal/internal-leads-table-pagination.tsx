"use client";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InternalLeadsTablePaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export const InternalLeadsTablePagination = ({
  hasNextPage,
  hasPreviousPage,
  currentPage,
  onPageChange,
}: InternalLeadsTablePaginationProps) => {
  const pageButtonOrder = useMemo(() => {
    const order: number[] = [];
    if (hasPreviousPage) {
      order.push(currentPage - 1);
    }
    if (!hasPreviousPage) {
      order.push(currentPage);
    }
    if (hasNextPage) {
      order.push(currentPage + 1);
    }
    if (currentPage > 1) {
      order.push(currentPage - 1, currentPage, currentPage + 1);
    }
    return order;
  }, [currentPage, hasNextPage, hasPreviousPage]);

  return (
    <div className="p-4 flex justify-end items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pageButtonOrder.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "outline" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="icon"
        disabled={!hasNextPage}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
