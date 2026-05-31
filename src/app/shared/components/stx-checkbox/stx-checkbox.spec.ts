import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StxCheckbox } from './stx-checkbox';

describe('StxCheckbox', () => {
  let component: StxCheckbox;
  let fixture: ComponentFixture<StxCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(StxCheckbox);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
