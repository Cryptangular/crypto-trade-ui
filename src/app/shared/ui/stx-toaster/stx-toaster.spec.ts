import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StxToaster } from './stx-toaster';
import { ElementRef, signal, viewChild } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { ToastType } from '../../../../core/services/toast/toast-service.types';
import { ToastService } from '../../../../core/services/toast/toast-service';

type MockToastService = {
  toasts: ReturnType<typeof signal<Partial<ToastType>[]>>;
  shows: ReturnType<typeof signal<boolean>>;
  remove: Mock;
  removeAll: Mock;
};

describe('TndmToaster', () => {
  let component: StxToaster;
  let fixture: ComponentFixture<StxToaster>;
  let mockToastService: MockToastService;

  beforeEach(async () => {
    mockToastService = {
      toasts: signal([]),
      shows: signal(false),
      remove: vi.fn(),
      removeAll: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [StxToaster],
      providers: [{ provide: ToastService, useValue: mockToastService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StxToaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should toggle toast opened ID', () => {
    const mockEvent = { stopPropagation: vi.fn() } as unknown as Event;

    component.toggleToast(mockEvent, 123);
    expect(component['openedToastId']()).toBe(123);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();

    component.toggleToast(mockEvent, 123);
    expect(component['openedToastId']()).toBe(null);
  });

  it('should close opened toast on outside click', () => {
    const mockEvent = { stopPropagation: vi.fn() } as unknown as Event;
    component.toggleToast(mockEvent, 1);
    expect(component['openedToastId']()).toBe(1);

    component.onClickOutside();
    expect(component['openedToastId']()).toBe(null);
  });

  it('should call service remove and reset ID if it was opened', () => {
    vi.useFakeTimers();
    const mockEvent = { stopPropagation: vi.fn() } as unknown as Event;
    component.toggleToast(mockEvent, 5);

    component.onRemove(5);
    vi.advanceTimersByTime(300);

    expect(mockToastService.remove).toHaveBeenCalledWith(5);
    expect(component['openedToastId']()).toBe(null);
  });

  it('should scroll to bottom when toasts change', () => {
    vi.useFakeTimers();

    const mockElement = {
      scrollHeight: 1000,
      scrollTo: vi.fn(),
    } as unknown as HTMLUListElement;

    const mockSignal = vi.fn(() => ({
      nativeElement: mockElement,
    })) as unknown as ReturnType<typeof viewChild<ElementRef<HTMLUListElement>>>;

    vi.spyOn(component as unknown as { scrollContainer: typeof mockSignal }, 'scrollContainer').mockReturnValue(
      mockSignal()
    );

    mockToastService.toasts.set([{ id: 1, title: 'New Toast' }]);

    fixture.detectChanges();

    vi.advanceTimersByTime(0);

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      top: 1000,
      behavior: 'smooth',
    });
  });

  it('should call removeAll on service', () => {
    vi.useFakeTimers();
    component.onRemoveAll();
    vi.runAllTimers();

    expect(mockToastService.removeAll).toHaveBeenCalled();
  });
});
