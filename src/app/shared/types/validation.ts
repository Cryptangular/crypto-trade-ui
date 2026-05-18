export type ErrorHandler = (fieldName: string, context: unknown) => string;

export type ValidationMessages = {
  required?: ErrorHandler | string;
  email?: ErrorHandler | string;
  minlength?: ErrorHandler | string;
  maxlength?: ErrorHandler | string;
  [key: string]: ErrorHandler | string | undefined;
};
