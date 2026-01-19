export interface SuccessResponse<T = unknown> {
  data: T;
  message: string;
}

export interface ErrorResponse<T = unknown> {
  data: T;
  message?: string;
  errors?: string;
}
