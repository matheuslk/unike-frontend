import { ValidationErrors } from '@angular/forms';
import { IFormErrorMessages } from '../interfaces/form-error-messages.interface';

export function getFormErrorMessage(
  field: string,
  errors: ValidationErrors | null,
  messages: IFormErrorMessages
): string | void {
  if (!errors) {
    return;
  }
  const firstErrorKey = Object.keys(errors)[0];
  const error = messages[field][firstErrorKey];
  return error;
}
