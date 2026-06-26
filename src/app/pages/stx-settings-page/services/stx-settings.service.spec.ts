import { TestBed } from '@angular/core/testing';

import { StxSettingsService } from './stx-settings.service';

describe('StxSettings', () => {
  let service: StxSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StxSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
