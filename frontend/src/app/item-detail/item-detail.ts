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
import { Item } from '../models/item';
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
  public item!: Signal<Item | undefined>;

  constructor() {
    this.id = signal(this.route.snapshot.paramMap.get('id') || '-1');
    this.item = computed(() => this.cartService.getItemById(this.id()));

    effect(() => {
      if (this.id() === '-1' || !this.item()) {
        this.goHome();
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
