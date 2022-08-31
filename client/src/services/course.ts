import { GetCoursesRequest, GetCoursesResponse } from '@app/types/rest';
import makeRequest from './makeRequest';

const prefix = 'courses';

export function getCourses({ page, limit }: GetCoursesRequest) {
  return makeRequest<GetCoursesResponse, GetCoursesRequest>(
    `${prefix}?page=${page}&limit=${limit}`
  );
}
