import { useMemo } from 'react';
import { Boundary, Dots, Number, Sibling } from '../types';
import { range } from '../utils';

interface PaginationParams {
  pageTotal: number;
  boundaryCount: number;
  siblingCount: number;
  currentPage: number;
}

type PaginationResult =
  | {
      type: Number | Boundary | Sibling;
      number: number;
    }
  | { type: Dots };

function usePagination({
  pageTotal,
  boundaryCount,
  siblingCount,
  currentPage,
}: PaginationParams): PaginationResult[] {
  const paginationRange = useMemo((): PaginationResult[] => {
    const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 3;

    if (totalPageNumbers >= pageTotal)
      return range(1, pageTotal).map((number) => ({
        type: 'number',
        number,
      }));

    const dots: PaginationResult = { type: 'dots' };

    const leftSiblingIndex = Math.max(
      currentPage - siblingCount,
      boundaryCount
    );
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      pageTotal - boundaryCount
    );

    const showLeftDots = leftSiblingIndex > boundaryCount + 2;
    const showRightDots = rightSiblingIndex < pageTotal - (boundaryCount + 1);

    if (!showLeftDots && showRightDots) {
      const leftItemCount = siblingCount * 2 + boundaryCount + 2;
      const rightBoundaryRange: PaginationResult[] = range(
        pageTotal - (boundaryCount - 1),
        pageTotal
      ).map((number) => ({ type: 'boundary', number }));
      const leftRange: PaginationResult[] = range(
        boundaryCount + 1,
        leftItemCount - siblingCount
      ).map((number) => ({ type: 'number', number }));
      const leftBoundaryRange: PaginationResult[] = range(1, boundaryCount).map(
        (number) => ({ type: 'boundary', number })
      );
      const leftSiblingRange: PaginationResult[] = range(
        leftItemCount - siblingCount + 1,
        leftItemCount
      ).map((number) => ({ type: 'sibling', number }));

      return [
        ...leftBoundaryRange,
        ...leftRange,
        ...leftSiblingRange,
        dots,
        ...rightBoundaryRange,
      ];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = siblingCount * 2 + boundaryCount + 2;
      const leftBoundaryRange: PaginationResult[] = range(1, boundaryCount).map(
        (number) => ({ type: 'boundary', number })
      );
      const rightRange: PaginationResult[] = range(
        pageTotal - rightItemCount + 1 + siblingCount,
        pageTotal - boundaryCount
      ).map((number) => ({ type: 'number', number }));
      const rightBoundaryRange: PaginationResult[] = range(
        pageTotal - boundaryCount + 1,
        pageTotal
      ).map((number) => ({ type: 'boundary', number }));
      const rightSiblingRange: PaginationResult[] = range(
        pageTotal - rightItemCount + 1,
        pageTotal - rightItemCount + siblingCount
      ).map((number) => ({ type: 'sibling', number }));

      return [
        ...leftBoundaryRange,
        dots,
        ...rightSiblingRange,
        ...rightRange,
        ...rightBoundaryRange,
      ];
    }

    const leftBoundaryRange: PaginationResult[] = range(1, boundaryCount).map(
      (number) => ({ type: 'boundary', number })
    );
    const leftSiblingRange: PaginationResult[] = range(
      leftSiblingIndex,
      leftSiblingIndex + siblingCount - 1
    ).map((number) => ({ type: 'sibling', number }));
    const middleRange: PaginationResult[] = range(
      leftSiblingIndex + siblingCount,
      rightSiblingIndex - siblingCount
    ).map((number) => ({ type: 'number', number }));
    const rightSiblingRange: PaginationResult[] = range(
      rightSiblingIndex - siblingCount + 1,
      rightSiblingIndex
    ).map((number) => ({ type: 'sibling', number }));
    const rightBoundaryRange: PaginationResult[] = range(
      pageTotal - boundaryCount + 1,
      pageTotal
    ).map((number) => ({ type: 'boundary', number }));

    return [
      ...leftBoundaryRange,
      dots,
      ...leftSiblingRange,
      ...middleRange,
      ...rightSiblingRange,
      dots,
      ...rightBoundaryRange,
    ];
  }, [siblingCount, currentPage, pageTotal]);

  return paginationRange;
}

export default usePagination;
