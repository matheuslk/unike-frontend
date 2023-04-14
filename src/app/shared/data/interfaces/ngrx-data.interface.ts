import { HttpError } from '../models/http-error.model';

export interface INGRXData<T> {
  data?: T;
  error?: HttpError;
  isLoading: boolean;
}
