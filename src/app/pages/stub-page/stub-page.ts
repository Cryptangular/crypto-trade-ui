import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'stx-stub-page',
  imports: [],
  templateUrl: './stub-page.html',
  styleUrl: './stub-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StubPage {}
