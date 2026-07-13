import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cryptoPairPipe',
})
export class CryptoPairPipe implements PipeTransform {
  private readonly baseCurrencies = ['USDT'];
  transform(value: string, separator = ' / '): string {
    if (!value) return '';
    const upperValue = value.toUpperCase();

    const base = this.baseCurrencies.find(currency => upperValue.endsWith(currency));
    if (base) {
      const asset = upperValue.slice(0, -base.length);
      return `${asset}${separator}${base}`;
    }

    return upperValue;
  }
}
