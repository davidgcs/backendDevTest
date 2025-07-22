import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  imports: [],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetail {
  private readonly route = inject(ActivatedRoute);
  public readonly id: WritableSignal<string>;

  constructor() {
    this.id = signal(this.route.snapshot.paramMap.get('id') || '');
  }
}
