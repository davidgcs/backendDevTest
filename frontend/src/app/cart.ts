import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private readonly items$: WritableSignal<Item[]> = signal([]);

  get items(): WritableSignal<Item[]> {
    return this.items$;
  }

  set items(items: Item[]) {
    this.items$.set(items);
  }

  updateItems(items: Item[]) {
    this.items$.update((store) => [...store, ...items]);
  }

  getItemById(id: string): Item | undefined {
    return this.items().find((i) => i.id === id);
  }

  constructor() {
    this.items = [
      {
        id: '1',
        name: 'Item 1',
        price: 10,
        description: 'Description of Item 1',
        imageUrl: 'https://picsum.photos/200',
      },
      {
        id: '2',
        name: 'Item 2',
        price: 10,
        description: 'Description of Item 2',
        imageUrl: 'https://picsum.photos/200',
      },
      {
        id: '3',
        name: 'Item 3',
        price: 10,
        description: 'Description of Item 3',
        imageUrl: 'https://picsum.photos/200',
      },
      {
        id: '4',
        name: 'Item 4',
        price: 10,
        description: 'Description of Item 4',
        imageUrl: 'https://picsum.photos/200',
      },
      {
        id: '5',
        name: 'Item 5',
        price: 10,
        description: 'Description of Item 5',
        imageUrl: 'https://picsum.photos/200',
      },
      {
        id: '6',
        name: 'Item 6',
        price: 10,
        description: 'Description of Item 6',
        imageUrl: 'https://picsum.photos/200',
      },
      {
        id: '7',
        name: 'Item 7',
        price: 10,
        description: 'Description of Item 7',
        imageUrl: 'https://picsum.photos/200',
      },
      {
        id: '8',
        name: 'Item 8',
        price: 10,
        description: 'Description of Item 8',
        imageUrl: 'https://picsum.photos/200',
      },
    ];
  }
}
