import { IFormErrorMessages } from 'src/app/core/data/interfaces/form-error-messages.interface';

export const LOGIN_FORM_ERROR_MESSAGES: IFormErrorMessages = {
  email: {
    required: 'Preencha o campo',
    email: 'Formato inválido',
  },
  password: {
    required: 'Preencha o campo',
    minlength: 'Campo deve possuir no mínimo 4 caracteres',
  },
};
