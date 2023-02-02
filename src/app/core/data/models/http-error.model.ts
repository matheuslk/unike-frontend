import { ERROR_MESSAGES } from '../enums/error-messages.enum';
import { IHttpError } from '../interfaces/http-error.interface';

export class HttpError implements IHttpError {
  constructor(
    public status: number,
    public error: any,
    public code?: string,
    public message?: string
  ) {
    this.code = code ?? '0';
    this.message = message ?? ERROR_MESSAGES.DEFAULT;
  }
}
