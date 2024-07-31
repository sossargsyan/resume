import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { Contact } from '../../types';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate(700)]),
      transition('* => void', [animate(700)]),
    ]),
  ],
})
export class ContactsComponent {
  @Input() data!: Contact[];
  hoveredIndex: number | null = null;
}
