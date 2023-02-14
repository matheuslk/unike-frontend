import { ValidationErrors } from '@angular/forms';
import { FORM_ERROR_MESSAGES } from '../consts/form-error-messages.const';

export const getFormErrorMessage = (
  field: string,
  errors: ValidationErrors | null
): string | void => {
  if (!errors) {
    return;
  }
  const firstErrorKey = Object.keys(errors)[0];
  const error = FORM_ERROR_MESSAGES[field][firstErrorKey];
  return error;
};
