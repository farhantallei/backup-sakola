export interface LoginResponse {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface CourseResponse {
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
    category: string;
  } | null;
}

export interface UnpublishedCourseResponse
  extends Omit<CourseResponse, 'publishedAt'> {
  published: false;
}

export interface GetUnpublishedCoursesResponse {
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
  courses: UnpublishedCourseResponse[];
}

export interface FastifyError {
  statusCode: number;
  error: string;
  message: string;
}
