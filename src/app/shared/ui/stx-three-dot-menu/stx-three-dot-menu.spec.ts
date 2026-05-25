import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxThreeDotMenu } from './stx-three-dot-menu';

describe('StxThreeDotMenu', () => {
  let component: StxThreeDotMenu;
  let fixture: ComponentFixture<StxThreeDotMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxThreeDotMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(StxThreeDotMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
