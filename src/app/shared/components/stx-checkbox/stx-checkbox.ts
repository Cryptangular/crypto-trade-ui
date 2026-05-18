import { ChangeDetectionStrategy, Component, inject, input, model, signal } from '@angular/core';
import { StxCheckboxLabelPosition } from './stx-checkbox.types';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-stx-checkbox',
  imports: [MatCheckboxModule],
  templateUrl: './stx-checkbox.html',
  styleUrl: './stx-checkbox.scss',
})
export class StxCheckbox implements ControlValueAccessor {
  private readonly controlDir = inject(NgControl, { self: true, optional: true });

  readonly checked = model<boolean>(false);

  readonly isDisabledInput = input<boolean>(false);
  readonly isRequired = input<boolean>(false);
  readonly labelPosition = input<StxCheckboxLabelPosition>('after');

  private readonly isFormDisabled = signal<boolean>(false);
  protected readonly isDisabled = (): boolean => this.isDisabledInput() || this.isFormDisabled();

  protected onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  protected onValueChange(newValue: boolean): void {
    this.checked.set(newValue);
    this.onChange(newValue);
  }

  writeValue(value: unknown): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isFormDisabled.set(isDisabled);
  }
}
