export interface IHttpError {
  status: number;
  error: any;
  code?: string;
  message?: string;
}
