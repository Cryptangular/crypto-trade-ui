import { TestBed } from '@angular/core/testing';

import { StxSettings } from './stx-settings';

describe('StxSettings', () => {
  let service: StxSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StxSettings);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
