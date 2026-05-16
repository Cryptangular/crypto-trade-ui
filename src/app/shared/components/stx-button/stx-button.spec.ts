import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StxButton } from './stx-button';
import { StxBtnConfig, StxIcons } from './stx-button.types';

describe('StxButton', () => {
  let component: StxButton;
  let fixture: ComponentFixture<StxButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxButton],
    }).compileComponents();

    fixture = TestBed.createComponent(StxButton);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.componentRef.setInput('btnConfig', {
      appearance: 'text',
      label: 'Click me',
    } as StxBtnConfig);

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render matIconButton when appearance is "icon"', () => {
    fixture.componentRef.setInput('btnConfig', {
      appearance: 'icon',
      icon: StxIcons.home,
    } as StxBtnConfig);

    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button[matIconButton]'));
    const iconEl = fixture.debugElement.query(By.css('mat-icon'));

    expect(buttonEl).toBeTruthy();
    expect(iconEl.nativeElement.textContent.trim()).toBe(StxIcons.home);

    const textButtonEl = fixture.debugElement.query(By.css('button[matButton]'));
    expect(textButtonEl).toBeNull();
  });

  it('should render matButton with label and without icon', () => {
    fixture.componentRef.setInput('btnConfig', {
      appearance: 'text',
      label: 'Submit',
    } as StxBtnConfig);

    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    const iconEl = fixture.debugElement.query(By.css('mat-icon'));

    expect(buttonEl).toBeTruthy();
    expect(buttonEl.nativeElement.classList.contains('mat-mdc-button')).toBe(true);
    expect(buttonEl.nativeElement.textContent.trim()).toBe('Submit');
    expect(iconEl).toBeNull();
  });

  it('should render matButton with both label and icon', () => {
    fixture.componentRef.setInput('btnConfig', {
      appearance: 'text',
      label: 'Dashboard',
      icon: StxIcons.dashboard,
    } as StxBtnConfig);

    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    const iconEl = fixture.debugElement.query(By.css('mat-icon'));

    expect(buttonEl).toBeTruthy();
    expect(buttonEl.nativeElement.classList.contains('mat-mdc-button')).toBe(true);
    expect(iconEl).toBeTruthy();
    expect(iconEl.nativeElement.textContent.trim()).toBe(StxIcons.dashboard);
  });

  it('should disabled the button when isDisabled input is true', () => {
    fixture.componentRef.setInput('btnConfig', {
      appearance: 'text',
      label: 'Disabled Button',
    } as StxBtnConfig);

    fixture.componentRef.setInput('isDisabled', true);
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.disabled).toBe(true);
  });

  it('should emit clicked output when button is clicked', () => {
    fixture.componentRef.setInput('btnConfig', {
      appearance: 'text',
      label: 'Action',
    } as StxBtnConfig);
    fixture.detectChanges();

    const spy = vi.spyOn(component.clicked, 'emit');

    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.triggerEventHandler('click', { stopPropagation: () => {} });

    expect(spy).toHaveBeenCalled();
  });
});
