import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxSearchBar } from './stx-search-bar';

describe('StxSearchBar', () => {
  let component: StxSearchBar;
  let fixture: ComponentFixture<StxSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxSearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(StxSearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
