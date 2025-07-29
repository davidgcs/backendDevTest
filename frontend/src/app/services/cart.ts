import {
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Item, ItemDetailModel } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private http = inject(HttpClient);

  private items$: Signal<Item[]> = toSignal(
    this.http.get<Item[]>(`${environment.apiUrl}/product/`),
    { initialValue: [] }
  );
  public readonly itemsSignal = this.items$;

  get items(): Item[] {
    return this.items$();
  }

  private cart$: WritableSignal<Item[]> = signal<Item[]>([]);
  public readonly cartSignal = this.cart$.asReadonly();

  get cart(): Item[] {
    return this.cart$();
  }

  set cart(items: Item[]) {
    this.cart$.set(items);
  }

  updateCart(items: Item[]) {
    this.cart$.update((store) => [...store, ...items]);
  }

  getItemById(id: string): Signal<ItemDetailModel> {
    return toSignal(this.http.get(`${environment.apiUrl}/product/${id}`), {
      initialValue: [] as any,
    });
  }

  constructor() {
    // load cart session
    const expireData = parseInt(localStorage.getItem('expire') || '0');
    if (new Date().getTime() > expireData) {
      localStorage.removeItem('cart');
      localStorage.removeItem('expire');
    } else this.cart = JSON.parse(localStorage.getItem('cart') ?? '[]');

    effect(() => {
      // store cart in local storage for creating a session
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem(
        'expire',
        (new Date().getTime() + 3600000).toString()
      );
    });
  }
}
