import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxConnectionStatus } from './stx-connection-status';

describe('StxConnectionStatus', () => {
  let component: StxConnectionStatus;
  let fixture: ComponentFixture<StxConnectionStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxConnectionStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(StxConnectionStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
