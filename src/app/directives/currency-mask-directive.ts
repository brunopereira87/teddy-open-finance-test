import { Directive, ElementRef, HostListener } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appCurrencyMask]',
  providers: [CurrencyPipe]
})
export class CurrencyMaskDirective {

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^\d]/g, '');

    
    const numericValue = (
      parseInt(value, 10) / 100
    ).toFixed(2);

    input.value = this.currencyPipe
    .transform(
      numericValue, 'BRL', 'symbol-narrow', '1.2-2', 'pt-BR'
    ) || '';
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    this.onInput(event);
  }
}