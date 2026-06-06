import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StxMenuItem } from './stx-menu-item';
import { ActionMenuItem, ParentMenuItem } from '../stx-three-dot-menu/stx-three-dot-menu.types';

describe('StxMenuItem', () => {
  let fixture: ComponentFixture<StxMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxMenuItem],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(StxMenuItem);
  });

  it('should call click handler by action menu item click', () => {
    const clickSpy = vi.fn();
    const actionItem: ActionMenuItem = {
      id: 'act',
      kind: 'action',
      label: 'Click Me',
      click: clickSpy,
    };

    fixture.componentRef.setInput('item', actionItem);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should open sub-menu by parent menu item click', () => {
    const parentItem: ParentMenuItem = {
      id: 'parent',
      kind: 'parent',
      label: 'Submenu',
      children: [{ id: 'olololo', kind: 'action', label: 'Child Item', click: vi.fn() }],
    };

    fixture.componentRef.setInput('item', parentItem);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const childItems = document.querySelectorAll('stx-menu-item');
    expect(childItems.length).toBe(1);
    expect(childItems[0].textContent?.trim()).toContain('Child Item');
  });
});
