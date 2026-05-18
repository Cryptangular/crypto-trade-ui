import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ToastService } from '../../../../core/services/toast/toast-service';

@Component({
  selector: 'stx-toaster',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './stx-toaster.html',
  styleUrl: './stx-toaster.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxToaster {
  protected readonly toast = inject(ToastService);
  protected readonly openedToastId = signal<number | null>(null);

  private readonly scrollContainer = viewChild<ElementRef<HTMLUListElement>>('scrollContainer');

  constructor() {
    effect(() => {
      this.toast.toasts();
      const el = this.scrollContainer()?.nativeElement;

      if (el) {
        setTimeout(() => {
          el.scrollTo({
            top: el.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
    });
  }

  toggleToast(event: Event, id: number): void {
    event.stopPropagation();
    this.openedToastId.update(currentId => (currentId === id ? null : id));
  }

  @HostListener('document:click')
  onClickOutside(): void {
    this.openedToastId.set(null);
  }

  onRemove(id: number): void {
    if (this.openedToastId() === id) {
      this.openedToastId.set(null);
    }
    this.toast.remove(id);
  }

  onRemoveAll(): void {
    this.toast.removeAll();
  }
}
