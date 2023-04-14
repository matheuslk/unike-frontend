import { IFormErrorMessages } from 'src/app/shared/data/interfaces/form-error-messages.interface';

export const PRODUCT_STORE_FORM_ERROR_MESSAGES: IFormErrorMessages = {
  name: {
    required: 'Preencha o campo',
    minlength: 'Campo deve possuir no mínimo 4 caracteres',
    maxlength: 'Campo deve possuir no máximo 45 caracteres',
  },
  price: {
    required: 'Preencha o campo',
    min: 'Campo deve possuir no mínimo o valor 1',
    max: 'Campo deve possuir no máximo o valor 7.000',
  },
  category_id: {
    required: 'Preencha o campo',
  },
  amount: {
    required: 'Preencha o campo',
    min: 'Campo deve possuir no mínimo o valor 1',
    max: 'Campo deve possuir no máximo o valor 50',
  },
  description: {
    maxlength: 'Campo deve possuir no máximo 255 caracteres',
  },
};
