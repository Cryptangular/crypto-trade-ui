import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MenuItem, ParentMenuItem } from '../stx-three-dot-menu/stx-three-dot-menu.types';

@Component({
  selector: 'stx-menu-item',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatIcon],
  templateUrl: './stx-menu-item.html',
  styleUrl: './stx-menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxMenuItem {
  readonly item = input.required<MenuItem>();

  protected isParent(item: MenuItem): item is ParentMenuItem {
    return item.kind === 'parent';
  }
}
