import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatSuffix } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { InputAppearance, InputType } from '../../types/input';
import { StxBaseControl } from '../../directives/stx-base-control';
import { StxErrorMessagePipe } from '../../pipes/stx-error-message-pipe';
import { ValidationMessages } from '../../types/validation';
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
export class StxInput<T = string> extends StxBaseControl<T> implements OnInit {
  readonly id = input.required<string>();
  readonly name = input.required<string>();
  readonly type = input<InputType>('text');
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly icon = input<MaterialIcons | ''>('email');

  readonly customErrors = input<ValidationMessages>({});

  readonly appearance = input<InputAppearance>('outline');
  readonly trimmed = input<boolean>(false);

  protected override formatValue(v: T | null): T | null {
    const value = this.trimmed() && typeof v === 'string' ? v.trim() : v;
    return value as T | null;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
