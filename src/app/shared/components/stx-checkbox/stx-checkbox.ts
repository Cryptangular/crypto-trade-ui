import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { StxCheckboxLabelPosition } from './stx-checkbox.types';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-stx-checkbox',
  imports: [MatCheckboxModule],
  templateUrl: './stx-checkbox.html',
  styleUrl: './stx-checkbox.scss',
})
export class StxCheckbox {
  readonly checked = model<boolean>(false);

  readonly isDisabled = input<boolean>(false);
  readonly isRequired = input<boolean>(false);
  readonly labelPosition = input<StxCheckboxLabelPosition>('after');

  protected onValueChange(newValue: boolean): void {
    this.checked.set(newValue);
  }
}
