import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from '../stx-three-dot-menu.types';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stx-menu-item',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatIcon],
  templateUrl: './stx-menu-item.html',
  styleUrl: './stx-menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxMenuItem {
  readonly item = input.required<MenuItem>();
}
