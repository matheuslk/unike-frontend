import { IHttpError } from '../interfaces/http-error.interface';

export class HttpError implements IHttpError {
  constructor(
    public status: number,
    public error: any,
    public message: string,
    public code: string
  ) {}
}
