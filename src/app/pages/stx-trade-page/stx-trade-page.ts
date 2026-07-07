import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'stx-trade-page',
  templateUrl: './stx-trade-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePage {
  readonly pair = input<string>('');
}
