import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'stx-footer',
  imports: [NgOptimizedImage],
  templateUrl: './stx-footer.html',
  styleUrl: './stx-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxFooter {
  readonly currentYear = 2026;
  readonly company = 'Stonks';
  readonly rsSchoolLink = 'https://rs.school';
}
