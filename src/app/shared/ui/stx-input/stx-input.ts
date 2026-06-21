import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatSuffix } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { InputAppearance, InputType } from './stx-input.types';
import { StxBaseControl } from '../../directives/stx-base-control';
import { StxErrorMessagePipe } from '../../pipes/stx-error-message-pipe';
import { MatIcon } from '@angular/material/icon';
import { MaterialIcons } from 'material-design-icons-literal-types';

@Component({
  selector: 'stx-input',
  imports: [MatFormField, MatLabel, MatError, MatInput, ReactiveFormsModule, StxErrorMessagePipe, MatIcon, MatSuffix],
  templateUrl: './stx-input.html',
  styleUrl: './stx-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StxInput<T = string> extends StxBaseControl<T> {
  readonly id = input.required<string>();
  readonly name = input.required<string>();
  readonly type = input<InputType>('text');
  readonly label = input<string>();
  readonly placeholder = input<string>('');
  readonly icon = input<MaterialIcons | ''>('');
  readonly secret = input<boolean>(false);
  readonly secretVisibility = signal<boolean>(false);

  readonly typeHandler = computed(() => {
    if (this.secret()) {
      return this.secretVisibility() ? 'text' : this.type();
    }

    return this.type();
  });

  readonly iconHandler = computed((): MaterialIcons | '' => {
    if (this.secret()) {
      return this.secretVisibility() ? 'visibility' : 'visibility_off';
    }

    return this.icon();
  });
  readonly iconClick = output<void>();

  readonly appearance = input<InputAppearance>('outline');
  readonly trimmed = input<boolean>(false);

  protected override formatValue(v: T | null): T | null {
    const value = this.trimmed() && typeof v === 'string' ? v.trim() : v;
    return value as T | null;
  }

  onInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    const value = this.formatValue(event.target.value as T);
    this.onChange(value);
  }

  onIconClick(event: MouseEvent): void {
    event.stopPropagation();

    if (this.secret()) {
      this.secretVisibility.update(v => !v);
    }

    this.iconClick.emit();
  }
}
