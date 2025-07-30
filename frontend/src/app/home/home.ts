import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Header } from '../header/header';
import { Item } from '../models/item';
import { Cart } from '../services/cart';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [Header, RouterModule, FormsModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly cartService = inject(Cart);

  public readonly items: Signal<Item[]> = this.cartService.itemsSignal;
  public readonly filteredItems: WritableSignal<Item[]> = signal([]);
  public search: WritableSignal<string> = signal('');

  private debouncedSearch = toSignal(
    toObservable(this.search).pipe(debounceTime(400), distinctUntilChanged()),
    { initialValue: '' }
  );

  constructor() {
    effect(() => {
      console.log('items effect', this.items());
      const values = this.items();
      this.filteredItems.set(values);
    });
    effect(() => this.applySearch(this.debouncedSearch()));
    effect(() => console.log('Filtered items updated:', this.filteredItems()));
  }

  applySearch(q: string): void {
    if (!this.items) return;
    if (!q || q.trim() === '') {
      this.filteredItems.set(this.items());
      return;
    }

    this.filteredItems.set(
      this.items().filter((item) =>
        `${item.brand.toLowerCase()} ${item.model.toLowerCase()}`.includes(
          q.trim().toLowerCase()
        )
      )
    );
  }
}
