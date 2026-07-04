import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { StxPriceChange } from './stx-price-change';

describe('StxPriceChange', () => {
  beforeEach(() => {
    const mockElementRef = new ElementRef(document.createElement('div'));

    TestBed.configureTestingModule({
      providers: [StxPriceChange, { provide: ElementRef, useValue: mockElementRef }],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(StxPriceChange);
    expect(directive).toBeTruthy();
  });
});
