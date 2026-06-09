import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'stx-connection-status',
  imports: [],
  template: ` <span
    class="stx-status-icon"
    [class.stx-status-icon--connected]="status()"
    [title]="tooltipText()"></span>`,
  styleUrl: './stx-connection-status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxConnectionStatus {
  readonly status = input<boolean>(false);

  readonly tooltipText = computed(() => `API Key ${this.status() ? '' : 'not '}configured`);
}
