import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StxSettingsForm } from './components/stx-settings-form/stx-settings-form';

@Component({
  selector: 'stx-settings-page',
  imports: [StxSettingsForm],
  templateUrl: './stx-settings-page.html',
  styleUrl: './stx-settings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxSettingsPage {}
