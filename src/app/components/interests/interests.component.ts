import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Interest } from '../../types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent {
  @Input() data!: Interest[];
}
