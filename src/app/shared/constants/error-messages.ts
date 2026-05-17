import { ValidationMessages } from '../types/validation';
import { hasProp } from '../utils/has-prop.guard';

export const DEFAULT_ERROR_MESSAGES: ValidationMessages = {
  required: name => `Поле ${name} обязательно`,
  email: () => `Введите корректный email`,
  minlength: (name, ctx) => {
    if (hasProp(ctx, 'requiredLength')) {
      return `${name} должно быть не короче ${ctx.requiredLength} символов.`;
    }
    return `${name} слишком короткое`;
  },
  maxlength: (name, ctx) => {
    if (hasProp(ctx, 'requiredLength')) {
      return `${name} должно быть не длиннее ${ctx.requiredLength} символов.`;
    }
    return `${name} слишком длинное`;
  },
};
