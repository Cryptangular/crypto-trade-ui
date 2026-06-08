import { DestroyRef, Directive, inject, input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorStateMatcher } from '@angular/material/core';
import { ValidationMessages } from '../types/validation';
import { StxDefaultErrorStateMatcher } from './default-error-state-matcher';

@Directive()
export class StxBaseControl<T> implements ControlValueAccessor, OnInit {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly ngControl = inject(NgControl, { optional: true, self: true });

  readonly control = new FormControl<T | null>(null);

  protected onChange: (value: T | null) => void = () => {};
  protected onTouched: () => void = () => {};

  readonly customErrorStateMatcher = input<ErrorStateMatcher>();
  readonly customErrors = input<ValidationMessages>({});
  readonly defaultErrorStateMatcher = new StxDefaultErrorStateMatcher();

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        map(val => this.formatValue(val)),
        distinctUntilChanged((prev, curr) => this.areValuesEqual(prev, curr)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(formattedValue => {
        if (!this.areValuesEqual(this.control.value, formattedValue)) {
          this.control.setValue(formattedValue, { emitEvent: false });
        }
        this.onChange(formattedValue);
      });

    const parentControl = this.ngControl?.control;
    if (!parentControl) return;

    this.syncValidators(parentControl);
    this.syncStateFromParent(parentControl);

    parentControl.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.syncStateFromParent(parentControl);
    });
  }

  protected markAsTouched(): void {
    this.onTouched();

    if (!this.control.touched) {
      this.control.markAsTouched({ onlySelf: true, emitEvent: false });
    }
  }

  protected syncValidators(parentControl: AbstractControl): void {
    this.control.setValidators(parentControl.validator);
    this.control.setAsyncValidators(parentControl.asyncValidator);
    this.control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  protected syncStateFromParent(parentControl: AbstractControl): void {
    this.syncErrors(parentControl.errors);
    this.syncTouched(parentControl.touched);
    this.syncDirty(parentControl.dirty);
    this.syncDisabled(parentControl.disabled);
  }

  protected syncErrors(errors: ValidationErrors | null): void {
    if (!this.shallowEqualErrors(this.control.errors, errors)) {
      this.control.setErrors(errors, { emitEvent: false });
    }
  }

  protected syncTouched(isTouched: boolean): void {
    const options = { onlySelf: true, emitEvent: false };
    if (isTouched) {
      this.control.markAsTouched(options);
    } else {
      this.control.markAsUntouched(options);
    }
  }

  protected syncDirty(isDirty: boolean): void {
    const options = { onlySelf: true, emitEvent: false };
    if (isDirty) {
      this.control.markAsDirty(options);
    } else {
      this.control.markAsPristine(options);
    }
  }

  protected syncDisabled(isDisabled: boolean): void {
    const options = { emitEvent: false };
    if (isDisabled) {
      this.control.disable(options);
    } else {
      this.control.enable(options);
    }
  }

  protected shallowEqualErrors(currentErrors: ValidationErrors | null, parentErrors: ValidationErrors | null): boolean {
    if (currentErrors === parentErrors) return true;
    if (!currentErrors || !parentErrors) return false;

    const currentKeys = Object.keys(currentErrors);
    const parentKeys = Object.keys(parentErrors);

    if (currentKeys.length !== parentKeys.length) return false;

    return currentKeys.every(key => currentErrors[key] === parentErrors[key]);
  }

  protected areValuesEqual(previous: T | null, current: T | null): boolean {
    return previous === current;
  }

  protected formatValue(value: T | null): T | null {
    return value;
  }

  writeValue(value: T | null): void {
    const formattedValue = this.formatValue(value);
    if (this.areValuesEqual(this.control.value, formattedValue)) return;

    this.control.setValue(formattedValue, { emitEvent: false });
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.syncDisabled(isDisabled);
  }
}
