export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorDetails?: unknown;
}