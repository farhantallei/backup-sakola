import {
  GetCoursesRequest,
  GetUnpublishedCoursesResponse,
} from '@app/types/rest';
import makeRequest from './makeRequest';

const prefix = 'courses';

export function getUnpublishedCourses({ page, limit }: GetCoursesRequest) {
  return makeRequest<GetUnpublishedCoursesResponse, GetCoursesRequest>(
    `${prefix}?page=${page}&limit=${limit}`
  );
}
