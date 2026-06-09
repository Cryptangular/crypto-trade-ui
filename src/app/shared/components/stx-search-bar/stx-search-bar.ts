import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { StxInput } from '../../ui/stx-input/stx-input';

@Component({
  selector: 'stx-search-bar',
  imports: [StxInput, ReactiveFormsModule],
  templateUrl: './stx-search-bar.html',
  styleUrl: './stx-search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxSearchBar {
  readonly searchChanged = output<string>();
  readonly searchControl = new FormControl('');

  private readonly searchStream = this.searchControl.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
    .subscribe(query => this.searchChanged.emit(query ?? ''));
}
