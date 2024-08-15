import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { ConnectItem } from '../../types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate(700)]),
      transition('* => void', [animate(700)]),
    ]),
  ],
})
export class ConnectComponent {
  data = input.required<ConnectItem[]>();
  hoveredIndex = signal<number | null>(null);
}
