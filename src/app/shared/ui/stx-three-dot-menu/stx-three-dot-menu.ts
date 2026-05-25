import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { StxMenuItem } from './stx-menu-item/stx-menu-item';
import { MenuItem, PosX, PosY } from './stx-three-dot-menu.types';
import { MaterialIcons } from 'material-design-icons-literal-types';

@Component({
  selector: 'stx-three-dot-menu',
  imports: [MatMenu, StxMenuItem, MatMenuTrigger, MatIcon, MatIconButton],
  templateUrl: './stx-three-dot-menu.html',
  styleUrl: './stx-three-dot-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxThreeDotMenu {
  protected readonly icon = input<MaterialIcons>('more_vert');
  readonly isDisabled = input(false);
  readonly xPosition = input<PosX>('after');
  readonly yPosition = input<PosY>('below');
  readonly menuItemsList = input.required<MenuItem[]>();
}
