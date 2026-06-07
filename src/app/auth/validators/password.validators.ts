import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string | null;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const isValidLength = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && isValidLength;

      if (passwordValid) {
        return null;
      }

      return {
        passwordStrength: {
          hasUpperCase,
          hasLowerCase,
          hasNumber,
          isValidLength,
        },
      };
    };
  }

  static passwordsMatch(passwordKey = 'password', confirmPasswordKey = 'confirmPassword'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const passwordControl = formGroup.get(passwordKey);
      const confirmPasswordControl = formGroup.get(confirmPasswordKey);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      const confirmErrors = confirmPasswordControl.errors;
      if (confirmErrors && !confirmErrors['passwordsMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        const errors: ValidationErrors = { passwordsMismatch: true };
        confirmPasswordControl.setErrors({ ...confirmErrors, ...errors });
        return errors;
      } else {
        if (confirmErrors) {
          const updatedErrors = { ...confirmErrors };
          delete updatedErrors['passwordsMismatch'];

          const hasRemainingErrors = Object.keys(updatedErrors).length > 0;
          confirmPasswordControl.setErrors(hasRemainingErrors ? updatedErrors : null);
        }
        return null;
      }
    };
  }
}
