import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StxThreeDotMenu } from './stx-three-dot-menu';
import { MenuItem } from './stx-three-dot-menu.types';

describe('StxThreeDotMenu', () => {
  let fixture: ComponentFixture<StxThreeDotMenu>;

  const mockMenu: readonly MenuItem[] = [
    { id: '1', kind: 'action', label: 'Delete', icon: 'delete', click: vi.fn() },
    {
      id: '2',
      kind: 'parent',
      label: 'Share',
      children: [{ id: '2-1', kind: 'action', label: 'Olololo', click: vi.fn() }],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxThreeDotMenu],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(StxThreeDotMenu);
  });

  it('should correct initialize inputs by defaulsts', () => {
    fixture.componentRef.setInput('menuItemsList', mockMenu);

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.getAttribute('aria-label')).toBe('open menu');

    const icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon.nativeElement.getAttribute('fonticon')).toBe('more_vert');
  });

  it('should skip opening menu if control disabled', () => {
    fixture.componentRef.setInput('menuItemsList', mockMenu);
    fixture.componentRef.setInput('isDisabled', true);

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBe(true);

    button.click();

    fixture.detectChanges();

    const menuItems = document.querySelectorAll('button[mat-menu-item]');
    expect(menuItems.length).toBe(0);
  });

  it('should open menu with items by click', () => {
    fixture.componentRef.setInput('menuItemsList', mockMenu);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const menuItems = document.querySelectorAll('button[mat-menu-item]');
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].textContent?.trim()).toContain('Delete');
    expect(menuItems[1].textContent?.trim()).toContain('Share');
  });
});
