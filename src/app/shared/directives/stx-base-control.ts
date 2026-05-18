import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export class StxBaseControl<T> implements ControlValueAccessor, OnInit {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly ngControl = inject(NgControl, { optional: true, self: true });

  readonly control = new FormControl<T | null>(null);

  protected onChange: (value: T | null) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        map(val => this.formatValue(val)),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(formattedValue => {
        if (this.control.value !== formattedValue) {
          this.control.setValue(formattedValue, { emitEvent: false });
        }
        this.onChange(formattedValue);
      });

    if (this.ngControl?.control) {
      const parentControl = this.ngControl.control;

      this.control.setValidators(parentControl.validator);
      this.control.setAsyncValidators(parentControl.asyncValidator);
      this.control.updateValueAndValidity({ emitEvent: false });

      let wasTouched = false;
      parentControl.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        if (this.control.errors !== parentControl.errors) {
          this.control.setErrors(parentControl.errors);
        }

        if (parentControl.touched && !wasTouched) {
          this.control.markAsTouched();
          wasTouched = true;
        } else if (!parentControl.touched && wasTouched) {
          this.control.markAsUntouched();
          wasTouched = false;
        }
      });
    }
  }

  protected formatValue(value: T | null): T | null {
    return value;
  }

  writeValue(value: T | null): void {
    const formattedValue = this.formatValue(value);

    if (this.control.value === formattedValue) return;

    this.control.setValue(formattedValue, { emitEvent: false });
    this.control.updateValueAndValidity({ emitEvent: false });
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }
}
