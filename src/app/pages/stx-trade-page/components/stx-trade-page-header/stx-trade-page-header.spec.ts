import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxTradePageHeader } from './stx-trade-page-header';

describe('StxTradePageHeader', () => {
  let component: StxTradePageHeader;
  let fixture: ComponentFixture<StxTradePageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxTradePageHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(StxTradePageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
