export interface LoginResponse {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface CourseResponse {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  level: 'pemula' | 'menengah' | 'lanjutan' | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface GetCoursesResponse {
  count: {
    total: number;
    prev: number;
    next: number;
  };
  page: {
    total: number;
    prev: number;
    next: number;
  };
  courses: CourseResponse[];
}

export interface FastifyError {
  statusCode: number;
  error: string;
  message: string;
}
