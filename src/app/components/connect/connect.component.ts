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
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-80px)' }),
        animate(300),
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0, transform: 'translateX(-80px)' })),
      ]),
    ]),
  ],
})
export class ConnectComponent {
  data = input.required<ConnectItem[]>();
  hoveredIndex = signal<number | null>(null);
}
