import { ApiResponse } from './ApiResponse';

export interface HttpClient {
  get<T>(url: string, context: Record<string, unknown>): Promise<ApiResponse<T>>;
  post<T>(url: string, data: unknown, context: Record<string, unknown>): Promise<ApiResponse<T>>;
  put<T>(url: string, data: unknown, context: Record<string, unknown>): Promise<ApiResponse<T>>;
  delete<T>(url: string, context: Record<string, unknown>): Promise<ApiResponse<T>>;
}
