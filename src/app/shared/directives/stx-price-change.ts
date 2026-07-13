import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[stxPriceChange]',
  standalone: true,
})
export class StxPriceChange {
  private el = inject(ElementRef);
  readonly price = input<number | string>(33, { alias: 'stxPriceChange' });
  private previousPrice?: number;

  constructor() {
    effect(() => {
      const currentPrice = +this.price();
      if (this.previousPrice !== undefined) {
        if (currentPrice > this.previousPrice) {
          this.el.nativeElement.style.color = '#00932f';
        }
        if (currentPrice < this.previousPrice) {
          this.el.nativeElement.style.color = '#c0000a';
        }
      }

      this.previousPrice = currentPrice;
    });
  }
}
