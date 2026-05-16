import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StxBtnConfig, StxBtnType } from './stx-button.types';

@Component({
  selector: 'stx-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './stx-button.html',
  styleUrl: './stx-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxButton {
  readonly clicked = output<MouseEvent>();
  readonly isDisabled = input<boolean>(false);
  readonly type = input<StxBtnType>('button');
  readonly btnConfig = input.required<StxBtnConfig>();

  protected readonly isIconAppearance = computed(() => this.btnConfig().appearance === 'icon');

  protected readonly matButtonAppearance = computed<MatButtonAppearance | ''>(() => {
    const config = this.btnConfig();
    return config.appearance === 'icon' ? '' : config.appearance;
  });

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
