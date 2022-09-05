import { createContext, useContext } from 'react';

export interface CourseListContextValue {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const CourseListContext = createContext<CourseListContextValue>(null!);

export function useCourseListContext(): CourseListContextValue {
  return useContext(CourseListContext) || {};
}
