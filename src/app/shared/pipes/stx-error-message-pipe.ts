import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorHandler, ValidationMessages } from '../types/validation';
import { DEFAULT_ERROR_MESSAGES } from '../constants/error-messages';

@Pipe({
  name: 'stxErrorMessage',
})
export class StxErrorMessagePipe implements PipeTransform {
  transform(
    errors: ValidationErrors | null | undefined,
    customConfig: ValidationMessages,
    fieldName = 'Поле'
  ): string | null {
    if (!errors) return null;
    const errorKeys = Object.keys(errors);
    if (errorKeys.length === 0) return null;
    const errorName = errorKeys[0];

    const errorContext = errors[errorName];

    const handler = this.getHandler(errorName, customConfig);

    if (!handler) {
      return `Ошибка: ${errorName}`;
    }

    if (typeof handler === 'function') {
      return handler(fieldName, errorContext);
    }

    return this.formatString(handler, { name: fieldName, ...errorContext });
  }

  private formatString(template: string, params: Record<string, unknown>): string {
    return template.replace(/\{\{\s*(\w+)\s*}}/g, (_, key) => {
      const value = params[key];
      if (Array.isArray(value)) return value.join(', ');
      return String(value ?? '');
    });
  }

  private getHandler(key: string, custom: ValidationMessages): string | ErrorHandler | undefined {
    if (key in custom) return custom[key];
    if (key in DEFAULT_ERROR_MESSAGES) return DEFAULT_ERROR_MESSAGES[key];
    return undefined;
  }
}
