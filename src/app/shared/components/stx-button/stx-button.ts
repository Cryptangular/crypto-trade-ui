import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonAppearance, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BtnConfig, BtnType } from './stx-button.types';

@Component({
  selector: 'stx-button',
  imports: [MatButtonModule, MatIconModule, MatIconButton],
  templateUrl: './stx-button.html',
  styleUrl: './stx-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxButton {
  readonly clicked = output<MouseEvent>();
  readonly isDisabled = input<boolean>(false);
  readonly type = input<BtnType>('button');
  readonly btnConfig = input.required<BtnConfig>();

  protected readonly matButtonAppearance = computed<MatButtonAppearance | ''>(() => {
    const config = this.btnConfig();
    return config.appearance === 'icon' ? '' : config.appearance;
  });

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
