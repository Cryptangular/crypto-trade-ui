import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { StxButton } from '../stx-button/stx-button';
import { StxBtnConfig } from '../stx-button/stx-button.types';

@Component({
  selector: 'stx-toaster',
  imports: [MatButtonModule, MatIconModule, StxButton],
  templateUrl: './stx-toaster.html',
  styleUrl: './stx-toaster.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxToaster {
  protected readonly toast = inject(ToastService);
  protected readonly openedToastId = signal<number | null>(null);
  protected readonly animatingToastIds = signal<number[]>([]);
  protected readonly isClearingAll = signal(false);

  private readonly scrollContainer = viewChild<ElementRef<HTMLUListElement>>('scrollContainer');

  protected readonly closeAllBtnConfig: StxBtnConfig = {
    icon: 'close',
    label: 'close all',
    appearance: 'tonal',
  };
  protected readonly closeToastBtnConfig: StxBtnConfig = {
    icon: 'close',
    appearance: 'icon',
  };

  constructor() {
    afterRenderEffect(() => {
      this.toast.toasts();
      const el = this.scrollContainer()?.nativeElement;
      el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
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
    this.animatingToastIds.update(ids => [...ids, id]);
  }

  onRemoveTransitionEnd(event: TransitionEvent, id: number): void {
    if (event.propertyName !== 'opacity') return;
    if (!this.animatingToastIds().includes(id)) return;

    this.toast.remove(id);
    this.animatingToastIds.update(ids => ids.filter(toastId => toastId !== id));
  }

  onRemoveAll(): void {
    if (this.openedToastId()) {
      this.openedToastId.set(null);
    }
    this.isClearingAll.set(true);
  }

  onClearAllTransitionEnd(event: TransitionEvent): void {
    if (event.propertyName !== 'opacity') return;
    if (!this.isClearingAll()) return;

    this.toast.removeAll();
    this.isClearingAll.set(false);
  }
}
