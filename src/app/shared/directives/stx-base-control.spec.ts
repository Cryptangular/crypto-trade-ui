// eslint-disable-next-line max-classes-per-file
import { StxBaseControl } from './stx-base-control';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { waitForMicrotasks } from '../utils/wait-for-microtasks';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'stx-child-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<input [formControl]="control" />`,
})
class ChildInputComponent extends StxBaseControl<string> implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override formatValue(value: string | null): string | null {
    return value ? value.toUpperCase() : value;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, ChildInputComponent],
  template: `<stx-child-input [formControl]="parentControl" />`,
})
class ParentComponent {
  parentControl = new FormControl<string | null>('');
}

describe('StxBaseControl', () => {
  let fixture: ComponentFixture<ParentComponent>;
  let parentInstance: ParentComponent;
  let childInstance: ChildInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ChildInputComponent, ParentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    parentInstance = fixture.componentInstance;
    const debugEl = fixture.debugElement.children[0];
    childInstance = debugEl.componentInstance as ChildInputComponent;
    fixture.detectChanges();
  });

  it('should create an instance and implement CVA', () => {
    expect(childInstance).toBeTruthy();
    expect(childInstance.control).toBeTruthy();
  });

  it('should synchronize writing value from parent control to child', async () => {
    const testWord = 'crypto';

    parentInstance.parentControl.setValue(testWord);

    await waitForMicrotasks();
    fixture.detectChanges();

    expect(childInstance.control.value).toBe(testWord.toUpperCase());
  });

  it('should synchronize writing value from child control to parent', async () => {
    const testWord = 'crypto';

    childInstance.control.setValue(testWord);

    await waitForMicrotasks();
    fixture.detectChanges();

    expect(parentInstance.parentControl.value).toBe(testWord.toUpperCase());
  });

  it('should synchronize errors and validation from parent', async () => {
    parentInstance.parentControl.setValidators([Validators.required]);
    parentInstance.parentControl.setValue('');

    parentInstance.parentControl.updateValueAndValidity();

    await waitForMicrotasks();
    fixture.detectChanges();

    expect(childInstance.control.invalid).toBeTruthy();
    expect(childInstance.control.hasError('required')).toBeTruthy();
  });

  it('should mark child control as touched, if parent control become touched', async () => {
    expect(childInstance.control.touched).toBe(false);

    parentInstance.parentControl.markAsTouched();
    parentInstance.parentControl.updateValueAndValidity();

    await waitForMicrotasks();
    fixture.detectChanges();

    expect(childInstance.control.touched).toBe(true);
  });
});
