import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'stx-trade-page',
  standalone: true,
  imports: [],
  templateUrl: './trade-page.html',
  styleUrl: './trade-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradePage {
  readonly pair = input<string>('');
}
