import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { About } from '../../types';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  @Input() data!: About;
}
