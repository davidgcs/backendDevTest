import {
  Component,
  inject,
  Input,
  signal,
  Signal,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  private readonly cartService = inject(Cart);

  @Input() title: string = 'HEADER';

  public nItems: Signal<number> = signal(0);

  constructor() {
    this.nItems = computed(() => this.cartService.cartCount());
  }

  navigateHome() {
    // Logic to navigate to home can be added here
    console.log('Navigating to home...');
    // For example, using a router service to navigate
    this.router.navigate(['/']);
  }
}
