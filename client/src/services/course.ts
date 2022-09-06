import {
  GetCourseRequest,
  GetCourseResponse,
  GetCoursesRequest,
  GetUncategorizedCoursesResponse,
  GetUnpublishedCoursesResponse,
} from '@app/types/rest';
import makeRequest from './makeRequest';

const prefix = 'courses';

export function getUncategorizedCourses({ page, limit }: GetCoursesRequest) {
  return makeRequest<GetUncategorizedCoursesResponse, GetCoursesRequest>(
    `${prefix}/uncategorized?page=${page}&limit=${limit}`
  );
}

export function getUnpublishedCourses({ page, limit }: GetCoursesRequest) {
  return makeRequest<GetUnpublishedCoursesResponse, GetCoursesRequest>(
    `${prefix}/unpublished?page=${page}&limit=${limit}`
  );
}

export function getCourse({ id }: GetCourseRequest) {
  return makeRequest<GetCourseResponse>(`${prefix}/${id}`);
}
