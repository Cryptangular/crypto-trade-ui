if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: (): void => {},
      removeListener: (): void => {},
      addEventListener: (): void => {},
      removeEventListener: (): void => {},
      dispatchEvent: (): boolean => false,
    }),
  });
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxTradePage } from './stx-trade-page';

describe('StxTradePage', () => {
  let component: StxTradePage;
  let fixture: ComponentFixture<StxTradePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxTradePage],
    }).compileComponents();

    fixture = TestBed.createComponent(StxTradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
