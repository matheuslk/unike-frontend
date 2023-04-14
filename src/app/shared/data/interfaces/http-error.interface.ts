export interface IHttpError {
  status: number;
  code: string;
  message: string;
  error?: any;
}
