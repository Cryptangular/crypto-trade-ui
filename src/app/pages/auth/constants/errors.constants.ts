import { ValidationMessages } from '../../../shared/types/validation';

export const EMAIL_VALIDATION_MESSAGES: ValidationMessages = {
  required: 'Email is required',
  email: 'Invalid email format (example: user@stx.com)',
  emailTaken: 'This email is already registered',
};

export const PASSWORD_VALIDATION_MESSAGES: ValidationMessages = {
  required: 'Password cannot be empty',
  passwordStrength:
    'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a number',
};

export const CONFIRM_PASSWORD_VALIDATION_MESSAGES: ValidationMessages = {
  required: 'Please confirm your password',
  passwordsMismatch: 'Passwords do not match',
};
