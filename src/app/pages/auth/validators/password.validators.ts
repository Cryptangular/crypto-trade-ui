import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string | null;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const isValidLength = value.length >= 8;

      if (hasUpperCase && hasLowerCase && hasNumber && isValidLength) {
        return null;
      }

      return {
        passwordStrength: { hasUpperCase, hasLowerCase, hasNumber, isValidLength },
      };
    };
  }

  static passwordsMatch(passwordControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      return passwordControl.value === control.value ? null : { passwordsMismatch: true };
    };
  }
}
