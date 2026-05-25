import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxMenuItem } from './stx-menu-item';

describe('StxMenuItem', () => {
  let component: StxMenuItem;
  let fixture: ComponentFixture<StxMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxMenuItem],
    }).compileComponents();

    fixture = TestBed.createComponent(StxMenuItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
