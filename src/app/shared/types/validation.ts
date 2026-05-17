export type ErrorHandler = (fieldName: string, context: unknown) => string;

export type ValidationMessages = {
  required?: ErrorHandler;
  email?: ErrorHandler;
  minlength?: ErrorHandler;
  maxlength?: ErrorHandler;
  [key: string]: ErrorHandler | undefined;
};
