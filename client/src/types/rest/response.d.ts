export interface LoginResponse {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

interface GetCourseCountResponse {
  count: {
    total: number;
    prev: number;
    next: number;
  };
  page: {
    total: number;
    current: number;
    prev: number;
    next: number;
  };
  limit: number;
}

export interface CourseResponse {
  id: string;
  title: string;
  description: string | null;
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

export interface CourseListResponse
  extends Omit<CourseResponse, 'description'> {}

export interface UncategorizedCourseListResponse
  extends Omit<CourseListResponse, 'publishedAt' | 'subject'> {}

export interface GetUncategorizedCoursesResponse
  extends GetCourseCountResponse {
  courses: UncategorizedCourseListResponse[];
}

export interface UnpublishedCourseListResponse
  extends Omit<CourseListResponse, 'publishedAt'> {
  published: false;
}

export interface GetUnpublishedCoursesResponse extends GetCourseCountResponse {
  courses: UnpublishedCourseListResponse[];
}

export interface GetCourseResponse extends Omit<CourseResponse, 'id'> {}

export interface FastifyError {
  statusCode: number;
  error: string;
  message: string;
}
