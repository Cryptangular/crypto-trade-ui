import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StxBaseControl } from '../../directives/stx-base-control';
import { MaterialIcons } from 'material-design-icons-literal-types';
import { MatIcon } from '@angular/material/icon';
import { StxErrorMessagePipe } from '../../pipes/stx-error-message-pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownAppearance, DropdownValue, SelectOption } from './stx-dropdown.types';

@Component({
  selector: 'stx-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, MatIcon, StxErrorMessagePipe, ReactiveFormsModule],
  templateUrl: './stx-dropdown.html',
  styleUrl: './stx-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxDropdown<T = string> extends StxBaseControl<DropdownValue<T>> {
  readonly id = input.required<string>();
  readonly name = input.required<string>();
  readonly label = input<string>();
  readonly options = input.required<SelectOption<T>[]>();
  readonly icon = input<MaterialIcons | ''>('');
  readonly multiple = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly appearance = input<DropdownAppearance>('outline');

  readonly compareWith = input<(o1: T, o2: T) => boolean>((o1, o2) => o1 === o2);

  protected override areValuesEqual(previous: DropdownValue<T>, current: DropdownValue<T>): boolean {
    const compare = this.compareWith();

    if (this.multiple()) {
      const prevArray = Array.isArray(previous) ? previous : [];
      const currArray = Array.isArray(current) ? current : [];

      if (prevArray.length !== currArray.length) return false;

      const remaining = [...currArray];

      for (const prevItem of prevArray) {
        const matchIndex = remaining.findIndex(currItem => compare(prevItem, currItem));
        if (matchIndex === -1) return false;
        remaining.splice(matchIndex, 1);
      }

      return remaining.length === 0;
    }

    if (previous === current) return true;
    if (previous === null || current === null) return false;
    if (Array.isArray(previous) || Array.isArray(current)) return false;

    return compare(previous, current);
  }

  protected override formatValue(value: T | T[] | null): T | T[] | null {
    if (this.multiple()) {
      return Array.isArray(value) ? value : [];
    }

    return value ?? null;
  }
}
