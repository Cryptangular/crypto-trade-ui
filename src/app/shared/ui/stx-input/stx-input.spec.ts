import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { beforeEach, describe, expect, it } from 'vitest';
import { StxInput } from './stx-input';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InputType } from './stx-input.types';
import { By } from '@angular/platform-browser';
import { waitForMicrotasks } from '../../utils/wait-for-microtasks';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, StxInput],
  template: `
    <stx-input
      [formControl]="control"
      [id]="id"
      [label]="label"
      [name]="name"
      [placeholder]="placeholder"
      [trimmed]="trimmed()"
      [type]="type" />
  `,
})
class ParentComponent {
  control = new FormControl<string | null>('');
  id = 'username-id';
  name = 'username';
  label = 'Имя пользователя';
  type: InputType = 'text';
  placeholder = 'Введите логин';
  readonly trimmed = input(false);
}

describe('StxInput', () => {
  let fixture: ComponentFixture<ParentComponent>;
  let parentComponent: ParentComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentComponent, StxInput, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    parentComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getInputInstance: () => StxInput = () => {
    const debugEl = fixture.debugElement.query(By.directive(StxInput));
    return debugEl.componentInstance as StxInput;
  };

  it('should create and inherit from StxBaseControl', () => {
    const inputInstance = getInputInstance();

    expect(inputInstance).toBeTruthy();
    expect(inputInstance.control).toBeTruthy();
  });

  it('should call onTouched on blur event', () => {
    const inputInstance = getInputInstance();
    const nativeInput = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    const touchCallback = vi.fn();
    inputInstance.registerOnTouched(touchCallback);

    nativeInput.dispatchEvent(new Event('blur'));

    expect(touchCallback).toHaveBeenCalled();
  });

  it('should trim string values if trimmed input is true', async () => {
    fixture.componentRef.setInput('trimmed', true);
    fixture.detectChanges();
    await waitForMicrotasks();
    fixture.detectChanges();

    const inputInstance = getInputInstance();

    expect(inputInstance.trimmed()).toBe(true);

    inputInstance.control.setValue('   crypto   ');

    expect(inputInstance.control.value).toBe('crypto');
    expect(parentComponent.control.value).toBe('crypto');
  });

  it('should synchronize disabled status from parent to children control', async () => {
    const inputInstance = getInputInstance();

    expect(parentComponent.control.enabled).toBe(true);
    expect(inputInstance.control.enabled).toBe(true);

    parentComponent.control.disable();
    fixture.detectChanges();
    await waitForMicrotasks();
    fixture.detectChanges();

    expect(parentComponent.control.disabled).toBe(true);
    expect(inputInstance.control.disabled).toBe(true);

    parentComponent.control.enable();
    fixture.detectChanges();
    await waitForMicrotasks();
    fixture.detectChanges();

    expect(parentComponent.control.enabled).toBe(true);
    expect(inputInstance.control.enabled).toBe(true);
  });

  it('should synchronize errors and parent validation', async () => {
    const inputInstance = getInputInstance();

    parentComponent.control.setValidators([Validators.required]);
    parentComponent.control.setValue('');
    parentComponent.control.updateValueAndValidity();

    fixture.detectChanges();
    await waitForMicrotasks();
    fixture.detectChanges();

    expect(parentComponent.control.invalid).toBe(true);
    expect(parentComponent.control.hasError('required')).toBe(true);
    expect(inputInstance.control.invalid).toBe(true);
    expect(inputInstance.control.hasError('required')).toBe(true);
  });

  it('should mark inner control as touched, if parent becomes touched', async () => {
    const inputInstance = getInputInstance();
    expect(inputInstance.control.touched).toBe(false);

    parentComponent.control.markAsTouched();

    parentComponent.control.updateValueAndValidity();
    fixture.detectChanges();
    await waitForMicrotasks();
    fixture.detectChanges();

    expect(parentComponent.control.touched).toBe(true);
    expect(inputInstance.control.touched).toBe(true);
  });
});
