import {
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartItem, CartResponse, Item, ItemDetailModel } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment.development';
import { ItemDetail } from '../item-detail/item-detail';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private http = inject(HttpClient);

  private items$: WritableSignal<Item[]> = signal<Item[]>([]);
  public readonly itemsSignal = this.items$.asReadonly();

  get items(): Item[] {
    return this.items$();
  }

  private cart$: WritableSignal<ItemDetailModel[]> = signal<ItemDetailModel[]>(
    []
  );
  public readonly cartSignal = this.cart$.asReadonly();

  private cartCount$: WritableSignal<number> = signal(0);
  public readonly cartCount = this.cartCount$.asReadonly();

  get cart(): ItemDetailModel[] {
    return this.cart$();
  }

  set cart(items: ItemDetailModel[]) {
    this.cart$.set(items);
  }

  updateCart(item: ItemDetailModel, body: CartItem) {
    this.http.post<CartResponse>(`${environment.apiUrl}/cart`, body).subscribe({
      next: (res) => this.cartCount$.set(res.count),
    });
    this.cart$.update((store) => [...store, item]);
  }

  getItemById(id: string): Signal<ItemDetailModel> {
    return toSignal(this.http.get(`${environment.apiUrl}/product/${id}`), {
      initialValue: [] as any,
    });
  }

  constructor() {
    // load cart session
    const expireData = parseInt(localStorage.getItem('expire') || '0');
    const storagedItems = JSON.parse(localStorage.getItem('items') || '[]');

    if (storagedItems.length && new Date().getTime() < expireData) {
      this.items$.set(storagedItems);
    } else {
      localStorage.removeItem('items');
      localStorage.removeItem('expire');
      this.items$.set(
        toSignal(this.http.get<Item[]>(`${environment.apiUrl}/product`), {
          initialValue: [],
        })()
      );
    }

    effect(() => {
      // store cart in local storage for creating a session
      console.log('items changed', this.items$());
      localStorage.setItem('items', JSON.stringify(this.items));
      localStorage.setItem(
        'expire',
        (new Date().getTime() + 3600000).toString()
      );
    });
  }
}
