export interface LoginRequest {
  username: string;
  password: string;
}

export interface GetCoursesRequest {
  page: number;
  limit: number;
}
