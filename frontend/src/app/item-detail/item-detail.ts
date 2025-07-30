import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../header/header';
import { Cart } from '../services/cart';
import { CartItem, Item, ItemDetailModel } from '../models/item';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  imports: [Header, CurrencyPipe, NgOptimizedImage],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartService = inject(Cart);

  public readonly id: WritableSignal<string>;
  public item: Signal<ItemDetailModel | undefined>;

  public selectedColor = signal(0);
  public selectedStorage = signal(0);

  constructor() {
    this.id = signal(this.route.snapshot.paramMap.get('id') || '-1');
    this.item = this.cartService.getItemById(this.id());

    effect(() => {
      console.log('Item changed', this.item());
    });

    effect(() => {
      if (this.id() === '-1' || !this.item()) {
        this.goHome();
      }
    });
  }

  onColorChanged(value: number) {
    console.log('Color seleccionado:', value);
    this.selectedColor.set(value);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  addToCart() {
    const currentItem = this.item();
    if (!currentItem) return;

    if (this.selectedColor() == 0) {
      this.selectedColor.set(currentItem.options.colors[0].code);
    }

    if (this.selectedStorage() == 0) {
      this.selectedStorage.set(currentItem.options.storages[0].code);
    }

    let body: CartItem = {
      id: currentItem.id,
      colorCode: this.selectedColor(),
      storageCode: this.selectedStorage(),
    };

    this.cartService.updateCart(currentItem, body);
  }
}
