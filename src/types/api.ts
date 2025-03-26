export type TSuccessApiResponse<T = unknown> = {
  success: true;
  message: string;
  data: T;
};

export type TErrorApiResponse = {
  success: false;
  message: string;
  error: TApiError;
};

// Combine them in a union type
export type TApiResponse<T = unknown> =
  | TSuccessApiResponse<T>
  | TErrorApiResponse;

export type TApiError = {
  code: string;
  message: string;
  validationErrors?: TValidationError[];
  data?: unknown;
  name?: string;
  httpStatus?: number;
};

export type TValidationError = {
  field: string;
  messages: string[];
};

export type TPaginatedResponse<T = unknown> = {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};
