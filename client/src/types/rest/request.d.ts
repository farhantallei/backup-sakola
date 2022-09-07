export interface LoginRequest {
  username: string;
  password: string;
}

export interface GetCourseCountRequest {
  page: number;
  limit: number;
  filter: 'uncategorized' | 'unpublished';
}

export interface GetCoursesRequest {
  page: number;
  limit: number;
}

export interface GetCourseRequest {
  id: string;
}
