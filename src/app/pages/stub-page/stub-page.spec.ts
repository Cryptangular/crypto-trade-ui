import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StubPage } from './stub-page';

describe('StubPage', () => {
  let component: StubPage;
  let fixture: ComponentFixture<StubPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StubPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StubPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
