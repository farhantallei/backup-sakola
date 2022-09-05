export interface LoginResponse {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

interface GetCoursesResponse {
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
}

export interface CourseListResponse {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  level: 'pemula' | 'menengah' | 'lanjutan' | null;
  published: boolean;
  status: 'berjalan' | 'selesai';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  subject: {
    name: string;
    category: 'islam' | 'dunia';
  } | null;
}

export interface UncategorizedCourseListResponse
  extends Omit<CourseListResponse, 'publishedAt' | 'subject'> {}

export interface GetUncategorizedCoursesResponse extends GetCoursesResponse {
  courses: UncategorizedCourseListResponse[];
}

export interface UnpublishedCourseListResponse
  extends Omit<CourseListResponse, 'publishedAt'> {
  published: false;
}

export interface GetUnpublishedCoursesResponse extends GetCoursesResponse {
  courses: UnpublishedCourseListResponse[];
}

export interface FastifyError {
  statusCode: number;
  error: string;
  message: string;
}
